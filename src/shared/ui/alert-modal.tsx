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
import { Button } from '@/shared/ui/button';
import { FC, ReactNode } from 'react';

interface AlertModalProps {
  title: string;
  description: string;
  buttonApproveText: ReactNode;
  buttonCancelText: string;
  buttonShowModalText: ReactNode;
  classNameButton?: string;
  onApprove: () => void;
  onCancel: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  disabledButtonApprove?: boolean;
}

const AlertModal: FC<AlertModalProps> = ({
  title,
  description,
  buttonApproveText,
  buttonCancelText,
  buttonShowModalText,
  classNameButton,
  onApprove,
  onCancel,
  isOpen,
  onOpenChange,
  disabledButtonApprove,
}) => {
  const handleOpenChange = (open: boolean) => {
    // Если пытаемся закрыть окно, но идет процесс удаления - не закрываем
    if (!open && typeof buttonApproveText === 'object') {
      return;
    }
    onOpenChange(open);
  };

  const handleApprove = (e: React.MouseEvent) => {
    e.preventDefault();
    onApprove();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild className={classNameButton}>
        <Button variant="outline" disabled={disabledButtonApprove}>
          {buttonShowModalText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{buttonCancelText}</AlertDialogCancel>
          <AlertDialogAction asChild>
          <Button onClick={handleApprove} disabled={typeof buttonApproveText === 'object'}>
              {buttonApproveText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
