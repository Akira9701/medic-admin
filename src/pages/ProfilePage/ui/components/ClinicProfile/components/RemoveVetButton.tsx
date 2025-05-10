import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { clinicApi } from '@/entities/Clinic/api/clinic.api';

interface RemoveVetButtonProps {
  clinicId: string;
  vetId: string;
  vetName: string;
  onVetRemoved: () => void;
  isEditMode: boolean;
}

export default function RemoveVetButton({
  clinicId,
  vetId,
  vetName,
  onVetRemoved,
  isEditMode,
}: RemoveVetButtonProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRemoveVet = async () => {
    try {
      setIsRemoving(true);
      await clinicApi.deleteVetFromClinic(clinicId, vetId);
      toast.success(`${vetName} успешно удален из клиники`);
      setDialogOpen(false);
      onVetRemoved();
    } catch (error) {
      console.error('Error removing vet from clinic:', error);
      toast.error('Не удалось удалить ветеринара из клиники');
    } finally {
      setIsRemoving(false);
    }
  };

  if (!isEditMode) {
    return null;
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить ветеринара из клиники?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы собираетесь удалить {vetName} из этой клиники. Это действие нельзя отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemoving}>Отмена</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleRemoveVet} disabled={isRemoving}>
              {isRemoving ? 'Удаление...' : 'Удалить'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
