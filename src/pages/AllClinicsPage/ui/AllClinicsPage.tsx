import { FC, useEffect } from 'react';
import AllClinics from './components/AllClinics';
import { clinicApi } from '@/entities/Clinic/api/clinic.api';
import useClinicStore, { setClinics } from '@/entities/Clinic/model/clinic.store';
import { LoaderPinwheel } from 'lucide-react';
import { IClinic } from '@/entities/Clinic/types';
import AddClinic from '@/pages/AddClinicPage/ui/AddClinicPage';
import { Link } from 'react-router-dom';
import { addClinicRoute } from '@/app/router/lib/constants';
const AllClinicsPage: FC = () => {
  const clinics = useClinicStore((state) => state.clinics);

  useEffect(() => {
    clinicApi.getAllClinics().then((clinics) => setClinics(clinics));
  }, []);

  return (
    <div className="w-full h-full relative">
      <div className="flex justify-between items-center mt-10 mb-3 border-b pb-2">
      <h2 className="mt-10 mb-3 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          All Clinics
        </h2>
        <Link to={addClinicRoute} className="px-4 py-2 bg-white text-black border border-black rounded-md hover:bg-gray-100 transition-colors">
          Add Clinic
        </Link>
      </div>
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
