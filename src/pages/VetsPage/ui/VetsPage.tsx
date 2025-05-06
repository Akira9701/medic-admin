import useVetsStore, {
  addVet,
  deleteVet,
  setVets,
  updateVet,
} from '@/entities/Vets/model/vets.store';
import vetsApi from '@/entities/Vets/api';
import { useEffect } from 'react';
import { VetsTable } from './components/VetsTable';

const VetsPage = () => {
  const vets = useVetsStore((state) => state.vets);
  useEffect(() => {
    vetsApi.getVets().then((vets) => {
      setVets(vets);
    });
  }, []);
  console.log(vets);

  return (
    <>
      <h2 className="mt-10 mb-3 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Vets
      </h2>
      <div className="w-full">
        {vets && (
          <VetsTable vets={vets} addVet={addVet} updateVet={updateVet} deleteVet={deleteVet} />
        )}
      </div>
    </>
  );
};

export default VetsPage;
