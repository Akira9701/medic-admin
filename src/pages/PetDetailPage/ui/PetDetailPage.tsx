import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@/shared/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import usePetStore, { updatePet } from '@/entities/Pet/model/pet.store';
import useUserStore from '@/entities/User/model/user.store';
import { IPet, IMedicalRecord } from '@/entities/Pet/types';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Separator } from '@/shared/ui/separator';
import { Calendar, Clock, FileDown, LoaderPinwheel, Shield, Stethoscope } from 'lucide-react';
import { medicalRecordSchema, MedicalRecordFormValues } from '../lib/schema';
import petApi from '@/entities/Pet/api/pet.api';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import AlertModal from '@/shared/ui/alert-modal';
import apiInstance from '@/shared/api/api.instance';

// Определяем тип для редактируемых полей питомца
type EditablePetFields = Pick<IPet, 'name' | 'breed' | 'birthDate' | 'chipNumber'>;

// Функция для генерации и скачивания PDF отчета
export const generatePetReport = async (petId: string): Promise<boolean> => {
  try {
    const response = await apiInstance.get(`/appointments/${petId}/report`, {
      responseType: 'blob',
    });

    // Создаем URL для blob
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));

    // Создаем временный элемент ссылки
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', `pet_report_${petId}.pdf`);

    // Добавляем в документ, кликаем и удаляем
    document.body.appendChild(fileLink);
    fileLink.click();
    document.body.removeChild(fileLink);

    toast.success('Отчет успешно скачан');
    return true;
  } catch (error) {
    console.error('Ошибка генерации отчета:', error);
    toast.error('Не удалось сгенерировать отчет');
    return false;
  }
};

export default function PetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const selectedPet = usePetStore((state) => state.selectedPet);
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSomeDataChanged, setIsSomeDataChanged] = useState<boolean>(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [generatingReport, setGeneratingReport] = useState<boolean>(false);

  const petDataRef = useRef<EditablePetFields>(
    selectedPet
      ? {
          name: selectedPet.name,
          breed: selectedPet.breed,
          birthDate: selectedPet.birthDate,
          chipNumber: selectedPet.chipNumber,
        }
      : ({} as EditablePetFields),
  );

  const isVet = useMemo(() => {
    return user && 'specialization' in user;
  }, [user]);

  // Инициализация формы
  const form = useForm<MedicalRecordFormValues>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      diagnosis: '',
      treatment: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (id) {
      petApi
        .getPetMedicalRecords(id)
        .then((records) => {
          setMedicalRecords(records);
        })
        .catch((error) => {
          console.error('Не удалось получить данные питомца:', error);
          toast.error('Не удалось загрузить информацию о питомце');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (selectedPet) {
      petDataRef.current = {
        name: selectedPet.name,
        breed: selectedPet.breed,
        birthDate: selectedPet.birthDate,
        chipNumber: selectedPet.chipNumber,
      };
    }
  }, [selectedPet]);

  const handleChange = useCallback(
    (key: keyof EditablePetFields, value: string) => {
      petDataRef.current[key] = value;
      if (!isSomeDataChanged) {
        setIsSomeDataChanged(true);
      }
    },
    [isSomeDataChanged],
  );

  // Обработка отправки формы
  const onSubmit = async (values: MedicalRecordFormValues) => {
    if (!selectedPet || !id || !isVet || !user || !('specialization' in user)) {
      toast.error('Невозможно добавить медицинскую запись');
      return;
    }

    try {
      const newRecord: IMedicalRecord = {
        id: uuidv4(),
        date: new Date().toISOString(),
        diagnosis: values.diagnosis,
        treatment: values.treatment,
        notes: values.notes || '',
        vet: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          specialization: user.specialization,
          avatarUrl: user.avatarUrl || '',
        },
      };

      await petApi.addMedicalRecord(id, newRecord);
      setMedicalRecords([...medicalRecords, newRecord]);
      form.reset();
    } catch (error) {
      console.error('Ошибка добавления медицинской записи:', error);
      toast.error('Не удалось добавить медицинскую запись');
    }
  };

  const handleSavePet = async () => {
    if (!selectedPet || !id) {
      toast.error('Невозможно обновить информацию о питомце');
      return;
    }

    try {
      await petApi.updatePet(id, petDataRef.current);
      updatePet(id, petDataRef.current);
      toast.success('Информация о питомце обновлена');
      setIsSomeDataChanged(false);
      setIsEditMode(false);
    } catch (error) {
      console.error('Ошибка обновления информации о питомце:', error);
      toast.error('Не удалось обновить информацию о питомце');
    }
  };

  const handleGenerateReport = async () => {
    if (!id) return;

    setGeneratingReport(true);
    await generatePetReport(id);
    setGeneratingReport(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 h-64">
        <LoaderPinwheel className="animate-spin" />
      </div>
    );
  }

  if (!selectedPet) {
    return (
      <div className="mx-auto max-w-md text-center p-4 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Питомец не найден</h2>
        <p className="text-muted-foreground mb-4">Запрашиваемый питомец не найден.</p>
        <Button asChild>
          <Link to="/pets">Назад к списку питомцев</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative">
      <div className="flex items-center space-x-2 absolute top-0 right-0">
        <Switch id="edit-mode" checked={isEditMode} onCheckedChange={setIsEditMode} />
        <Label htmlFor="edit-mode">Режим редактирования</Label>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          {selectedPet.name}
          <Badge className="capitalize px-3 py-1 ml-3">{selectedPet.type.toLowerCase()}</Badge>
        </h2>
      </div>

      <div className="p-4 border rounded-lg bg-card text-card-foreground mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Информация о питомце
            </h3>
            <div className="space-y-2">
              {isEditMode ? (
                <>
                  <div className="flex items-center">
                    <Label className="font-medium w-28">Имя:</Label>
                    <Input
                      defaultValue={selectedPet.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div className="flex items-center">
                    <Label className="font-medium w-28">Порода:</Label>
                    <Input
                      defaultValue={selectedPet.breed}
                      onChange={(e) => handleChange('breed', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div className="flex items-center">
                    <Label className="font-medium w-28">Дата рождения:</Label>
                    <Input
                      type="date"
                      defaultValue={selectedPet.birthDate.split('T')[0]}
                      onChange={(e) => handleChange('birthDate', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div className="flex items-center">
                    <Label className="font-medium w-28">Номер чипа:</Label>
                    <Input
                      defaultValue={selectedPet.chipNumber}
                      onChange={(e) => handleChange('chipNumber', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <span className="font-medium w-28">Порода:</span>
                    <span>{selectedPet.breed}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-28">Дата рождения:</span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {new Date(selectedPet.birthDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-28">Номер чипа:</span>
                    <code className="bg-muted px-2 py-1 rounded font-mono text-xs">
                      {selectedPet.chipNumber}
                    </code>
                  </div>
                </>
              )}
            </div>

            {isEditMode && (
              <div className="flex justify-end mt-4">
                <Button
                  disabled={!isSomeDataChanged}
                  variant="outline"
                  onClick={() => {
                    if (selectedPet) {
                      petDataRef.current = {
                        name: selectedPet.name,
                        breed: selectedPet.breed,
                        birthDate: selectedPet.birthDate,
                        chipNumber: selectedPet.chipNumber,
                      };
                    }
                    setIsSomeDataChanged(false);
                  }}
                  className="mr-2">
                  Сбросить
                </Button>
                <AlertModal
                  isOpen={isOpenAlertModal}
                  onOpenChange={setIsOpenAlertModal}
                  title="Вы уверены?"
                  description="Сохранить изменения информации о питомце?"
                  buttonApproveText="Сохранить"
                  buttonCancelText="Отменить"
                  buttonShowModalText="Сохранить"
                  onApprove={() => {
                    handleSavePet();
                    setIsOpenAlertModal(false);
                  }}
                  onCancel={() => {
                    setIsOpenAlertModal(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* Кнопка генерации отчета */}
          <div className="flex items-start space-x-4 pt-4">
            <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
              <FileDown className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Отчет</h2>
              <Button
                onClick={handleGenerateReport}
                disabled={generatingReport || !id}
                className="flex items-center gap-2">
                {generatingReport ? 'Генерация...' : 'Сгенерировать отчет'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isVet && (
        <Tabs defaultValue="records" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px] mb-3">
            <TabsTrigger value="records" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Медицинские записи
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center">
              <Stethoscope className="h-4 w-4 mr-2" />
              Добавить запись
            </TabsTrigger>
          </TabsList>

          <TabsContent value="records">
            <div className="border rounded-lg p-4 bg-card text-card-foreground">
              <div className="mb-3">
                <h3 className="text-2xl font-semibold">История болезни</h3>
                <p className="text-muted-foreground">
                  Просмотр полной истории болезни для {selectedPet.name}
                </p>
              </div>
              <Separator className="my-3" />

              <div className=" max-h-[500px]">
                {medicalRecords && medicalRecords.length > 0 ? (
                  <div className="space-y-4 overflow-y-scroll max-h-[500px]">
                    {medicalRecords.map((record) => (
                      <div key={record.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-lg flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            {format(new Date(record.date), 'PPP')}
                          </h4>
                          <Badge variant="secondary">Др. {record.vet.firstName}</Badge>
                        </div>
                        <Separator className="my-2" />
                        <div className="space-y-2 pt-1">
                          <div>
                            <span className="font-medium text-muted-foreground">Диагноз:</span>{' '}
                            <span className="text-foreground">{record.diagnosis}</span>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Лечение:</span>{' '}
                            <span className="text-foreground">{record.treatment}</span>
                          </div>
                          {record.notes && (
                            <div>
                              <span className="font-medium text-muted-foreground">Примечания:</span>{' '}
                              <span className="text-foreground">{record.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed">
                    <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground/60" />
                    <p className="mt-4 text-muted-foreground">Нет доступных медицинских записей</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="add">
            <div className="border rounded-lg p-4 bg-card text-card-foreground">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold">Добавить медицинскую запись</h3>
                <p className="text-muted-foreground">
                  Добавить новую медицинскую запись для {selectedPet.name}
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Диагноз</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите диагноз" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="treatment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Лечение</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите назначенное лечение" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Примечания (необязательно)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Введите дополнительные примечания"
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={form.formState.isSubmitting}>
                    Добавить запись
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
