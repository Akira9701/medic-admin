import { IClinic } from '@/entities/Clinic/types';
import { useCallback, useRef, useState } from 'react';
import UserInfo from './components/ClinicInfo';
import AddressInfo from './components/AddressInfo';
import { Separator } from '@/shared/ui/separator';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import AlertModal from '@/shared/ui/alert-modal';
import { Button } from '@/shared/ui/button';
import { updateUser } from '@/entities/User/model/user.store';
import TitleInfo from './components/TitleInfo';
import { ClinicPageChangeHandlerKey } from '@/types/profilePages.types';
import Services from '../Services/ui/Services';
import VetsInfo from './components/VetsInfo';
import { IVet } from '@/entities/Vets/types';
import { clinicApi } from '@/entities/Clinic/api/clinic.api';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AddVetToClinicModal } from '@/pages/ClinicDetailPage/ui/components';
import { RemoveVetButton } from './components';

const ClinicProfile = ({ clinic }: { clinic: IClinic }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [services, setServices] = useState<string[]>(clinic?.services || []);
  const [isSomeDataChanged, setIsSomeDataChanged] = useState<boolean>(false);
  const [clinicVets, setClinicVets] = useState<IVet[] | null>(null);

  const userDataRef = useRef<Partial<IClinic>>({
    name: clinic?.name,
    email: clinic?.email,
    description: clinic?.description,
    city: clinic?.city,
    street: clinic?.street,
    services: clinic?.services,
  });

  const handleChange = useCallback(
    (key: ClinicPageChangeHandlerKey, value: string) => {
      userDataRef.current[key] = value;
      if (!isSomeDataChanged) {
        console.log(isSomeDataChanged);
        setIsSomeDataChanged(true);
      }
    },
    [isSomeDataChanged],
  );

  useEffect(() => {
    clinicApi.getClinicVets(clinic.id).then((vets) => setClinicVets(vets));
  }, [clinic.id]);

  const handleVetAdded = () => {
    clinicApi.getClinicVets(clinic.id).then((vets) => setClinicVets(vets));
  };

  const handleVetRemoved = () => {
    clinicApi.getClinicVets(clinic.id).then((vets) => setClinicVets(vets));
  };

  return (
    <>
      <div className="flex items-center space-x-2 absolute top-8 right-6">
        <Switch id="airplane-mode" checked={isEditMode} onCheckedChange={setIsEditMode} />
        <Label htmlFor="airplane-mode">Edit Mode</Label>
      </div>
      <UserInfo title={clinic?.name} email={clinic?.email} avatarUrl={clinic?.logoUrl} />
      <TitleInfo
        isSomeDataChanged={isSomeDataChanged}
        isEditMode={isEditMode}
        onChange={handleChange}
        name={clinic?.name}
        email={clinic?.email}
        description={clinic?.description}
      />
      <Separator className="mt-4" />
      <AddressInfo
        isSomeDataChanged={isSomeDataChanged}
        isEditMode={isEditMode}
        onChange={handleChange}
        address={{ city: clinic?.city, street: clinic?.street }}
      />
      <Separator className="mt-4" />
      <Services
        addService={(service) => {
          setServices([...services, service]);
        }}
        removeService={(service) => {
          setServices(services.filter((s) => s !== service));
        }}
        services={clinic?.services}
        isEditMode={isEditMode}
      />
      <Separator className="mt-4" />
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Clinic Doctors</h3>
          <AddVetToClinicModal
            clinicId={clinic.id}
            clinicName={clinic.name}
            onVetAdded={handleVetAdded}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinicVets?.map((vet) => (
            <div key={vet.id} className="relative">
              <Link to={`/vet/${vet.id}`}>
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={vet.avatarUrl}
                        alt={`${vet.firstName} ${vet.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {vet.firstName} {vet.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{vet.specialization}</p>
                    </div>
                  </div>
                </div>
              </Link>
              <RemoveVetButton
                clinicId={clinic.id}
                vetId={vet.id}
                vetName={`${vet.firstName} ${vet.lastName}`}
                onVetRemoved={handleVetRemoved}
                isEditMode={isEditMode}
              />
            </div>
          ))}
        </div>
      </div>
      <Separator className="mt-4" />

      <div className="w-full flex justify-end">
        <Button
          disabled={!isSomeDataChanged}
          className="mt-4 ml-auto"
          variant="outline"
          onClick={() => setIsSomeDataChanged(false)}>
          Сбросить
        </Button>
        <AlertModal
          isOpen={isOpenAlertModal}
          onOpenChange={setIsOpenAlertModal}
          classNameButton="ml-4 mt-4"
          title="Вы уверены?"
          description="Это действие нельзя отменить."
          buttonApproveText="Сохранить"
          buttonCancelText="Отменить"
          buttonShowModalText="Сохранить"
          onApprove={() => {
            updateUser<IClinic>({ ...userDataRef.current, services });
            setIsOpenAlertModal(false);
          }}
          onCancel={() => {
            setIsOpenAlertModal(false);
          }}
        />
      </div>
    </>
  );
};

export default ClinicProfile;
