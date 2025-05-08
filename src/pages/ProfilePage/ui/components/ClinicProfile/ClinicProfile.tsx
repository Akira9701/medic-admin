import { IClinic } from '@/entities/Clinic/types';
import { FC, useCallback, useRef, useState } from 'react';
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

interface IClinicProfile {
  clinic: IClinic;
}

// interface IInputsData {
//   name: string;
//   email: string;
//   description: string;
//   city: string;
//   street: string;
//   services: string[];
// }

const ClinicProfile: FC<IClinicProfile> = ({ clinic }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [services, setServices] = useState<string[]>(clinic?.services || []);
  const [isSomeDataChanged, setIsSomeDataChanged] = useState<boolean>(false);
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

  return (
    <>
      <div className="flex items-center space-x-2 absolute top-0 right-0">
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
      />
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
