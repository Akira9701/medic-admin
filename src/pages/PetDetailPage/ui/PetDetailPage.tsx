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
import { Calendar, Clock, LoaderPinwheel, Shield, Stethoscope } from 'lucide-react';
import { medicalRecordSchema, MedicalRecordFormValues } from '../lib/schema';
import petApi from '@/entities/Pet/api/pet.api';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import AlertModal from '@/shared/ui/alert-modal';

// Define a type for editable pet fields
type EditablePetFields = Pick<IPet, 'name' | 'breed' | 'birthDate' | 'chipNumber'>;

export default function PetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const selectedPet = usePetStore((state) => state.selectedPet);
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSomeDataChanged, setIsSomeDataChanged] = useState<boolean>(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

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

  // Initialize form
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
          console.error('Failed to fetch pet:', error);
          toast.error('Failed to load pet details');
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

  // Handle form submission
  const onSubmit = async (values: MedicalRecordFormValues) => {
    if (!selectedPet || !id || !isVet || !user || !('specialization' in user)) {
      toast.error('Unable to add medical record');
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
      console.error('Error adding medical record:', error);
      toast.error('Failed to add medical record');
    }
  };

  const handleSavePet = async () => {
    if (!selectedPet || !id) {
      toast.error('Unable to update pet');
      return;
    }

    try {
      await petApi.updatePet(id, petDataRef.current);
      updatePet(id, petDataRef.current);
      toast.success('Pet information updated');
      setIsSomeDataChanged(false);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating pet:', error);
      toast.error('Failed to update pet information');
    }
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
        <h2 className="text-2xl font-semibold mb-2">Pet Not Found</h2>
        <p className="text-muted-foreground mb-4">The requested pet could not be found.</p>
        <Button asChild>
          <Link to="/pets">Back to Pets</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative">
      <div className="flex items-center space-x-2 absolute top-0 right-0">
        <Switch id="edit-mode" checked={isEditMode} onCheckedChange={setIsEditMode} />
        <Label htmlFor="edit-mode">Edit Mode</Label>
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
              Pet Information
            </h3>
            <div className="space-y-2">
              {isEditMode ? (
                <>
                  <div className="flex items-center">
                    <Label className="font-medium w-28">Name:</Label>
                    <Input
                      defaultValue={selectedPet.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div className="flex items-center">
                    <Label className="font-medium w-28">Breed:</Label>
                    <Input
                      defaultValue={selectedPet.breed}
                      onChange={(e) => handleChange('breed', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div className="flex items-center">
                    <Label className="font-medium w-28">Birth Date:</Label>
                    <Input
                      type="date"
                      defaultValue={selectedPet.birthDate.split('T')[0]}
                      onChange={(e) => handleChange('birthDate', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <div className="flex items-center">
                    <Label className="font-medium w-28">Chip Number:</Label>
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
                    <span className="font-medium w-28">Breed:</span>
                    <span>{selectedPet.breed}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-28">Birth Date:</span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {new Date(selectedPet.birthDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-28">Chip Number:</span>
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
        </div>
      </div>

      {isVet && (
        <Tabs defaultValue="records" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px] mb-3">
            <TabsTrigger value="records" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Medical Records
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center">
              <Stethoscope className="h-4 w-4 mr-2" />
              Add Record
            </TabsTrigger>
          </TabsList>

          <TabsContent value="records">
            <div className="border rounded-lg p-4 bg-card text-card-foreground">
              <div className="mb-3">
                <h3 className="text-2xl font-semibold">Medical History</h3>
                <p className="text-muted-foreground">
                  View the complete medical history for {selectedPet.name}
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
                          <Badge variant="secondary">Dr. {record.vet.firstName}</Badge>
                        </div>
                        <Separator className="my-2" />
                        <div className="space-y-2 pt-1">
                          <div>
                            <span className="font-medium text-muted-foreground">Diagnosis:</span>{' '}
                            <span className="text-foreground">{record.diagnosis}</span>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Treatment:</span>{' '}
                            <span className="text-foreground">{record.treatment}</span>
                          </div>
                          {record.notes && (
                            <div>
                              <span className="font-medium text-muted-foreground">Notes:</span>{' '}
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
                    <p className="mt-4 text-muted-foreground">No medical records available</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="add">
            <div className="border rounded-lg p-4 bg-card text-card-foreground">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold">Add Medical Record</h3>
                <p className="text-muted-foreground">
                  Add a new medical record for {selectedPet.name}
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter diagnosis" {...field} />
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
                        <FormLabel>Treatment</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter prescribed treatment" {...field} />
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
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter additional notes"
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
                    Add Record
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
