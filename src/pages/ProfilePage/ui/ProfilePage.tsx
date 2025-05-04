import useUserStore from '@/entities/User/model/user.store';
import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vet/types';

import ClinicProfile from './components/ClinicProfile/ClinicProfile';
import VetProfile from './components/VetProfile/VetProfile';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const isClinic = !!(user as IClinic)?.name;

  return (
    <div className="relative">
      {isClinic ? <ClinicProfile clinic={user as IClinic} /> : <VetProfile vet={user as IVet} />}
    </div>
  );
};

export default ProfilePage;
