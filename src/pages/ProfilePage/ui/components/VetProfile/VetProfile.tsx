import { IVet } from '@/entities/Vet/types';
import { FC } from 'react';
import UserInfo from '../UserInfo/UserInfo';

interface IVetProfileProps {
  vet: IVet;
}

const VetProfile: FC<IVetProfileProps> = ({ vet }) => {
  return (
    <>
      <UserInfo
        title={`${vet?.firstName} ${vet?.lastName}`}
        email={vet?.email}
        avatarUrl={vet?.avatarUrl}
      />
    </>
  );
};

export default VetProfile;
