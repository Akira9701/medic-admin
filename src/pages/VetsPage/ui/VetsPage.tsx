import useVetsStore, {
  addVet,
  deleteVet,
  setVets,
  updateVet,
} from '@/entities/Vets/model/vets.store';
import vetsApi from '@/entities/Vets/api';
import { useState, useEffect } from 'react';
import { VetsTable } from './components/VetsTable';
import { Button } from '@/shared/ui/button';
import { PlusIcon } from 'lucide-react';
import AddVetModal from './components/AddVetModal';
import { IVet } from '@/entities/Vets/types';
import { toast } from 'sonner';
const VetsPage = () => {
  const vets = useVetsStore((state) => state.vets);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddVet = (newVet: IVet) => {
    vetsApi.createVet(newVet).then((vet) => {
      addVet(vet);
      toast.success('Vet added successfully');
    });
  };

  useEffect(() => {
    if (!vets || vets.length === 0) {
      vetsApi.getAllVets().then((vets) => {
        setVets(vets);
      });
    }
  }, []);
  console.log(vets);

  return (
    <>
      <div className="border-b mb-2 flex justify-between items-center">
        <h2 className="mt-10 mb-3 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          All Vets
        </h2>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Vet
        </Button>
      </div>

      <div className="w-full">
        {vets && (
          <VetsTable vets={vets} addVet={addVet} updateVet={updateVet} deleteVet={deleteVet} />
        )}
      </div>

      <AddVetModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddVet={handleAddVet}
      />
    </>
  );
};

export default VetsPage;
