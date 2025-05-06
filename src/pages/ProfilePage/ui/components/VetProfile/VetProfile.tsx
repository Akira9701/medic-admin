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

interface IVetProfileProps {
  vet: IVet;
}

const VetProfile: FC<IVetProfileProps> = ({ vet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [isSomeDataChanged, setIsSomeDataChanged] = useState<boolean>(false);
  const userDataRef = useRef<Partial<IVet>>({
    firstName: vet?.firstName,
    lastName: vet?.lastName,
    email: vet?.email,
    specialization: vet?.specialization,
    avatarUrl: vet?.avatarUrl,
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
      <div className="flex items-center space-x-2 absolute top-0 right-0">
        <Switch id="airplane-mode" checked={isEditMode} onCheckedChange={setIsEditMode} />
        <Label htmlFor="airplane-mode">Режим редактирования</Label>
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
          classNameButton="ml-4 mt-4"
          title="Вы уверены?"
          description="Это действие нельзя отменить."
          buttonApproveText="Сохранить"
          buttonCancelText="Отменить"
          buttonShowModalText="Сохранить"
          onApprove={() => {
            updateUser<IVet>(userDataRef.current);
          }}
          onCancel={() => {}}
        />
      </div>
    </>
  );
};

export default VetProfile;
