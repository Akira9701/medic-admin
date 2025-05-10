import { FC } from 'react';
import { IClinic } from '@/entities/Clinic/types';
import 'src/app/styles/index.css';

interface IAllClinicsProps {
  clinic: IClinic;
}

const AllClinics: FC<IAllClinicsProps> = ({ clinic }) => {
  // Construct full address from city, street, and building
  const fullAddress = `${clinic.city}, ${clinic.street}, ${clinic.building}`;

  return (
    <div className="rounded-lg h-fit border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col space-y-4">
        {/* Name and Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={clinic.logoUrl} alt={clinic.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-gray-900 truncate">{clinic.name}</p>
            <p className="text-sm text-gray-500">{fullAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClinics;
