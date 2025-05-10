import { useState, useEffect } from 'react';
import { clinicApi } from '@/entities/Clinic/api/clinic.api';
import useClinicStore, { addClinic, setClinics } from '@/entities/Clinic/model/clinic.store';
import { LoaderPinwheel, PlusIcon } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';
import { ICreateClinic } from '@/entities/Clinic/types';
import { ClinicsTable, AddClinicModal } from './components';

const AllClinicsPage = () => {
  const clinics = useClinicStore((state) => state.clinics);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddClinic = (newClinic: Omit<ICreateClinic, 'id'>) => {
    // Here you would typically call an API to create the clinic
    // For now, we'll just update the store
    clinicApi.createClinic(newClinic).then((clinic) => {
      addClinic(clinic);
      toast.success('Клиника успешно добавлена');
    });
  };

  useEffect(() => {
    if (!clinics || clinics.length === 0) {
      clinicApi.getAllClinics().then((clinics) => setClinics(clinics));
    }
  }, []);

  return (
    <div className="w-full h-full relative">
      <div className="border-b mb-2 flex justify-between items-center">
        <h2 className="mt-10 mb-3 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Все клиники
        </h2>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Добавить клинику
        </Button>
      </div>

      {clinics === null ? (
        <div className="absolute h-fit w-fit inset-0 m-auto">
          <LoaderPinwheel className="animate-spin" />
        </div>
      ) : (
        <ClinicsTable clinics={clinics} />
      )}

      <AddClinicModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddClinic={handleAddClinic}
      />
    </div>
  );
};

export default AllClinicsPage;
