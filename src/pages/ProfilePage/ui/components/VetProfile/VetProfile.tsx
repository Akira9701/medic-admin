import { FC, useCallback, useRef, useState } from 'react';
import { Switch } from '@/shared/ui/switch';
import { Label } from '@/shared/ui/label';
import { IVet } from '@/entities/Vets/types';
import UserInfo from './components/UserInfo';
import { Separator } from '@/shared/ui/separator';
import TitleInfo from './components/TitleInfo';
import QualificationInfo from './components/QualificationInfo';
import AlertModal from '@/shared/ui/alert-modal';
import { updateUser } from '@/entities/User/model/user.store';
import { VetPageChangeHandlerKey } from '@/types/profilePages.types';
import { Button } from '@/shared/ui/button';
import Services from '../Services/ui/Services';
import { Link } from 'react-router-dom';
import vetsApi  from '@/entities/Vets/api/index';
interface IVetProfileProps {
  vet: IVet;
}

const VetProfile: FC<IVetProfileProps> = ({ vet }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [isSomeDataChanged, setIsSomeDataChanged] = useState<boolean>(false);
  const [services, setServices] = useState<string[]>(vet?.services || []);
  const userDataRef = useRef<Partial<IVet>>({
    firstName: vet?.firstName,
    lastName: vet?.lastName,
    email: vet?.email,
    specialization: vet?.specialization,
    avatarUrl: vet?.avatarUrl,
    qualification: vet?.qualification,
    bio: vet?.bio,
  });

  const handleChange = useCallback(
    (key: VetPageChangeHandlerKey, value: string) => {
      if (key === 'address') {
        userDataRef.current.address = userDataRef.current.address || {
          city: '',
          street: '',
          building: '',
        };
        userDataRef.current.address[key as keyof typeof userDataRef.current.address] = value; // Now you can safely assign
        return;
      }
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
      <div className="flex items-center space-x-2 absolute top-8 right-6">
        <Switch id="airplane-mode" checked={isEditMode} onCheckedChange={setIsEditMode} />
        <Label htmlFor="airplane-mode">Edit Mode</Label>
      </div>
      <UserInfo
        specialization={vet?.specialization}
        firstName={vet?.firstName}
        lastName={vet?.lastName}
        email={vet?.email}
        avatarUrl={vet?.avatarUrl}
      />
      <Separator className="my-4" />
      <TitleInfo
        firstName={vet?.firstName}
        lastName={vet?.lastName}
        bio={vet?.bio}
        onChange={handleChange}
        isEditMode={isEditMode}
        isSomeDataChanged={isSomeDataChanged}
      />
      <Separator className="my-4" />
      <QualificationInfo
        qualification={vet?.qualification}
        specialization={vet?.specialization}
        onChange={handleChange}
        isEditMode={isEditMode}
        isSomeDataChanged={isSomeDataChanged}
      />
      <Separator className="mt-4" />
      <Services
        addService={(service) => {
          setServices([...services, service]);
        }}
        services={services}
        removeService={(service) => {
          setServices(services.filter((s) => s !== service));
        }}
        isEditMode={isEditMode}
      />
      <Separator className="mt-4" />
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-4">Current Workplace</h3>
        {vet?.clinic ? (
          <Link to={`/clinic/${vet.clinic.id}`}>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={vet.clinic?.logoUrl}
                    alt={vet.clinic?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{vet.clinic?.name}</p>
                  <p className="text-sm text-gray-500">{vet.clinic?.address}</p>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <p className="text-gray-500">No clinic assigned</p>
        )}
      </div>
      <Separator className="my-4" />
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
          onApprove={async () => {
            await vetsApi.updateVetProfile({ ...userDataRef.current, services, id: vet.id });
            updateUser<IVet>({ ...userDataRef.current, services });
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

export default VetProfile;
