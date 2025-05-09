import { FC, useEffect } from 'react';
import AllClinics from './components/AllClinics';
import { clinicApi } from '@/entities/Clinic/api/clinic.api';
import useClinicStore, { setClinics } from '@/entities/Clinic/model/clinic.store';
import { LoaderPinwheel } from 'lucide-react';
import { IClinic } from '@/entities/Clinic/types';
import { Link } from 'react-router';

const AllClinicsPage: FC = () => {
  const clinics = useClinicStore((state) => state.clinics);

  useEffect(() => {
    clinicApi.getAllClinics().then((clinics) => setClinics(clinics));
  }, []);

  return (
    <div className="w-full h-full relative">
      <h2 className="mt-10 mb-3 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        All Clinics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)] overflow-y-auto">
        {clinics === null ? (
          <div className="absolute h-fit w-fit inset-0 m-auto">
            <LoaderPinwheel className="animate-spin" />
          </div>
        ) : clinics.length > 0 ? (
          clinics.map((clinic) => (
            <Link key={clinic.id} to={`/clinic/${clinic.id}`}>
              <AllClinics clinic={clinic} />
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No clinics found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllClinicsPage;
