import { FC, useState } from 'react';
import { Mail, Award, Briefcase, FileText } from 'lucide-react';
import { IClinic } from '@/entities/Clinic/types';
import AlertModal from '@/shared/ui/alert-modal';
import { buttonVariants } from '@/shared/ui/button';
import 'src/app/styles/index.css';

interface IAllClinicsProps {
  clinic: IClinic;
}

const AllClinics: FC<IAllClinicsProps> = ({ clinic }) => {
  return (
    <div className="rounded-lg h-fit border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col space-y-4">
        {/* Name and Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={clinic.avatarUrl} alt={clinic.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-gray-900 truncate">{clinic.name}</p>
            <p className="text-sm text-gray-500">{clinic.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClinics;
