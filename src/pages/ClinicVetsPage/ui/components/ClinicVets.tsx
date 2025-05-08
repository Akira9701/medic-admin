import { FC, useState } from 'react';
import { Mail, Award, Briefcase, FileText } from 'lucide-react';
import { IVet } from '@/entities/Vets/types';
import AlertModal from '@/shared/ui/alert-modal';
import { buttonVariants } from '@/shared/ui/button';
import 'src/app/styles/index.css';

interface IClinicVetsProps {
  vet: IVet;
  onDelete?: (id: string) => void;
}

const ClinicVets: FC<IClinicVetsProps> = ({ vet, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (onDelete) {
      setIsDeleting(true);
      await onDelete(vet.id);
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    if (!isDeleting) {
      setIsOpen(false);
    }
  };

  return (
    <div className="rounded-lg h-fit border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
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

        {/* Bio */}
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">{vet.bio}</p>
          </div>
        </div>

        {/* Qualification */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
            <Award className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">{vet.qualification}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
            <Mail className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">{vet.email}</p>
          </div>
        </div>

        {/* Services */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">
              {vet.services.join(', ')}
            </p>
          </div>
        </div>

        {onDelete && (
          <div className="flex justify-end">
            <AlertModal
              title="Удаление ветеринара"
              description={`Вы уверены, что хотите удалить ветеринара ${vet.firstName} ${vet.lastName}?`}
              buttonApproveText={isDeleting ? <span className="loader" /> : "Удалить"}
              buttonCancelText="Отмена"
              buttonShowModalText="Удалить"
              classNameButton={buttonVariants({
                variant: "default",
                size: "default"
              })}
              onApprove={handleDelete}
              onCancel={handleCancel}
              isOpen={isOpen}
              onOpenChange={(open) => {
                if (!isDeleting) {
                  setIsOpen(open);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicVets;
