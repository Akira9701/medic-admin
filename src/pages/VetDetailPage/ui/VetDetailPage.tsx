import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { IVet } from '@/entities/Vets/types';
import vetsApi from '@/entities/Vets/api';
import { clinicApi } from '@/entities/Clinic/api/clinic.api';
import { LoaderPinwheel } from 'lucide-react';
import VetProfile  from '@/pages/ProfilePage/ui/components/VetProfile/VetProfile';

const VetDetailPage = () => {
  const  location  = useLocation(); 
  const [vet, setVet] = useState<IVet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVet = async () => {
      if (!location.pathname) return;
      
    //   try {
    //     setIsLoading(true);
    //     const foundVet = await clinicApi.getVetById({ id: location.pathname.split('/').pop() as string });
    //     setVet(foundVet || null);
    //   } catch (error) {
    //     console.error('Error loading vet:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }

      try {
        setIsLoading(true);
        const vetId = location.pathname.split('/').pop() as string;
        
        // Get all clinics first
        const clinics = await clinicApi.getAllClinics();
        console.log("clinics = ", clinics);
        // For each clinic, get its vets and check if our vet is there
        for (const clinic of clinics) {
          const clinicVets = await clinicApi.getClinicVets(clinic.id);
          console.log("clinicVets = ", clinicVets);
          const foundVet = clinicVets.find(v => v.id === vetId);
          console.log("foundVet = ", foundVet);
          if (foundVet) {
            const foundVet1 = await clinicApi.getVetById({ id: location.pathname.split('/').pop() as string });
            setVet(foundVet1);
            break;
          }
        }
      } catch (error) {
        console.error('Error loading vet:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVet();
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoaderPinwheel className="animate-spin" />
      </div>
    );
  }

  if (!vet && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <h3 className="text-xl font-medium text-gray-900">Vet not found</h3>
        <p className="mt-2 text-gray-500">The vet you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  if (vet) {
    return <VetProfile vet={vet} />;
  }

  return null;
};

export default VetDetailPage;
