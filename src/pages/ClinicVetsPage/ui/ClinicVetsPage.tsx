import { FC, useState } from 'react';
import { vetMock } from '@/shared/mocks/vet.mock';
import ClinicVets from './components/ClinicVets';
import useUserStore from '@/entities/User/model/user.store';
import { IClinic } from '@/entities/Clinic/types';
import { clinicApi } from '@/entities/Clinic/api/clinic.api';

const ClinicVetsPage: FC = () => {
  const user = useUserStore((state) => state.user) as IClinic;
  const [vets, setVets] = useState(vetMock.filter(vet => vet.clinic.id === user.id));
  
  const handleDelete = async (id: string) => {
    try {
      await clinicApi.deleteVetFromClinic(user.id, id);
      setVets(prevVets => prevVets.filter(vet => vet.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении ветеринара:', error);
    }
  };

  return (
    <div className="w-full h-full relative">
      <h2 className="mt-10 mb-3 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Clinic Vets
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(100vh-140px)] overflow-y-auto">
        {vets.length > 0 ? (
          vets.map((vet) => (
            <ClinicVets key={vet.id} vet={vet} onDelete={handleDelete} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">В этой клинике пока нет ветеринаров</p>
        )}
      </div>
    </div>
  );
};

export default ClinicVetsPage;
