import { FC } from 'react';
import { IClinic } from '@/entities/Clinic/types';
import { Award, FileText } from 'lucide-react';

interface VetsInfoProps {
  clinic: IClinic;
}

const VetsInfo: FC<VetsInfoProps> = ({ clinic }) => {
  if (!clinic) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Veterinarians</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clinic.vets && clinic.vets.map((vet) => (
          <div key={vet.id} className="rounded-lg h-fit border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col space-y-4">
              {/* Avatar and Name */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={vet.avatarUrl} alt={`${vet.firstName} ${vet.lastName}`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {vet.firstName} {vet.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{vet.specialization}</p>
                </div>
              </div>

              {/* About */}
              {vet.about && (
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{vet.about}</p>
                  </div>
                </div>
              )}

              {/* Education */}
              {vet.education && (
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{vet.education}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {(!clinic.vets || clinic.vets.length === 0) && (
        <p className="text-center text-muted-foreground mt-4">
          No veterinarians are currently associated with this clinic
        </p>
      )}
    </div>
  );
};

export default VetsInfo;
