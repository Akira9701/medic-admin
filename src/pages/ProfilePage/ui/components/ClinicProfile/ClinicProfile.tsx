import { IClinic } from '@/entities/Clinic/types';
import { FC, useCallback, useRef, useState } from 'react';
import UserInfo from '../UserInfo/UserInfo';
import AddressInfo from './components/AddressInfo';
import TitleInfo from '../TitleInfo/TitleInfo';
import { Separator } from '@/shared/ui/separator';
import ClinicServices from './components/ClinicServices';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import AlertModal from '@/shared/ui/alert-modal';
import { Button } from '@/shared/ui/button';

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

  const [isSomeDataChanged, setIsSomeDataChanged] = useState<boolean>(false);
  const userDataRef = useRef<Record<string, string | string[]>>({
    name: clinic?.name,
    email: clinic?.email,
    description: clinic?.description,
    city: clinic?.city,
    street: clinic?.street,
    services: clinic?.services,
  });

  const handleChange = useCallback(
    (key: string, value: string) => {
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
      <ClinicServices services={clinic?.services} />
      <Separator className="mt-4" />
      <div className="w-full flex justify-end">
        <Button
          disabled={!isSomeDataChanged}
          className="mt-4 ml-auto"
          variant="outline"
          onClick={() => setIsSomeDataChanged(false)}>
          Reset Data
        </Button>
        <AlertModal
          classNameButton="ml-4 mt-4"
          title="Are you sure?"
          description="This action cannot be undone."
          buttonApproveText="Approve"
          buttonCancelText="Cancel"
          buttonShowModalText="Save Data"
          onApprove={() => {}}
          onCancel={() => {}}
        />
      </div>
    </>
  );
};

export default ClinicProfile;
