import useVetsStore, {
  addVet,
  deleteVet,
  setVets,
  updateVet,
} from '@/entities/Vets/model/vets.store';
import vetsApi from '@/entities/Vets/api';
import { useEffect } from 'react';
import { VetsTable } from './components/VetsTable';
import { Button } from '@/shared/ui/button';
import { PlusIcon } from 'lucide-react';
const VetsPage = () => {
  const vets = useVetsStore((state) => state.vets);
  useEffect(() => {
    vetsApi.getAllVets().then((vets) => {
      setVets(vets);
    });
  }, []);
  console.log(vets);

  return (
    <>
      <div className="border-b mb-2 flex justify-between items-center">
        <h2 className="mt-10 mb-3 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          All Vets
        </h2>
        <Button>
          <PlusIcon className="w-4 h-4" />
          Add Vet
        </Button>
      </div>

      <div className="w-full">
        {vets && (
          <VetsTable vets={vets} addVet={addVet} updateVet={updateVet} deleteVet={deleteVet} />
        )}
      </div>
    </>
  );
};

export default VetsPage;
