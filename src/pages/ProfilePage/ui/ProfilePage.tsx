import useUserStore from '@/entities/User/model/user.store';
import { IClinic } from '@/entities/Clinic/types';

import ClinicProfile from './components/ClinicProfile/ClinicProfile';
import VetProfile from './components/VetProfile/VetProfile';
import { IVet } from '@/entities/Vets/types';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  // Check for firstName which is only present in IVet
  const isClinic = !(user as IVet)?.firstName;

  return (
    <div className="relative">
      {isClinic ? <ClinicProfile clinic={user as IClinic} /> : <VetProfile vet={user as IVet} />}
    </div>
  );
};

export default ProfilePage;
