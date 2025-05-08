import { FC, useEffect } from 'react';
import ClinicVets from './components/ClinicVets';
import useUserStore from '@/entities/User/model/user.store';
import { clinicApi } from '@/entities/Clinic/api/clinic.api';
import useClinicVetsStore, {
  removeClinicVet,
  setClinicVets,
} from '@/entities/Vets/model/clinicVets.store';
import { LoaderPinwheel } from 'lucide-react';
const ClinicVetsPage: FC = () => {
  const userId = useUserStore((state) => state.user?.id);
  const clinicVets = useClinicVetsStore((state) => state.vets);

  const handleDelete = async (id: string) => {
    if (!userId) return;
    try {
      await clinicApi.deleteVetFromClinic(userId, id);
      removeClinicVet(id);
    } catch (error) {
      console.error('Ошибка при удалении ветеринара:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      clinicApi.getClinicVets(userId).then((vets) => setClinicVets(vets));
    }
  }, [userId]);

  return (
    <div className="w-full h-full relative">
      <h2 className="mt-10 mb-3 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Clinic Vets
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(100vh-140px)] overflow-y-auto">
        {clinicVets === null ? (
          <div className="absolute h-fit w-fit inset-0 m-auto">
            <LoaderPinwheel className="animate-spin" />
          </div>
        ) : clinicVets.length > 0 ? (
          clinicVets.map((vet) => <ClinicVets key={vet.id} vet={vet} onDelete={handleDelete} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            В этой клинике пока нет ветеринаров
          </p>
        )}
      </div>
    </div>
  );
};

export default ClinicVetsPage;
