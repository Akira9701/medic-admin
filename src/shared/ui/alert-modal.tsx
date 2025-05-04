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
import { FC } from 'react';

interface AlertModalProps {
  title: string;
  description: string;
  buttonApproveText: string;
  buttonCancelText: string;
  buttonShowModalText: string;
  classNameButton?: string;
  onApprove: () => void;
  onCancel: () => void;
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
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={classNameButton}>
        <Button variant="outline">{buttonShowModalText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{buttonCancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onApprove}>{buttonApproveText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
