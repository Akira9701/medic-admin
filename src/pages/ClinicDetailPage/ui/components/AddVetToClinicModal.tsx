import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/shared/ui/alert-dialog';
import { IVet } from '@/entities/Vets/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import apiInstance from '@/shared/api/api.instance';
import useVetsStore from '@/entities/Vets/model/vets.store';

interface AddVetToClinicModalProps {
  clinicId: string;
  clinicName: string;
  onVetAdded: () => void;
}

export default function AddVetToClinicModal({
  clinicId,
  clinicName,
  onVetAdded,
}: AddVetToClinicModalProps) {
  const [selectedVetId, setSelectedVetId] = useState<string>('');
  const [linkingVet, setLinkingVet] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const vets = useVetsStore((state) => state.vets) || [];
  const [availableVets, setAvailableVets] = useState<IVet[]>([]);

  // Fetch available vets when dialog opens
  const handleOpenChange = async (open: boolean) => {
    setDialogOpen(open);
    if (open) {
      setLoading(true);
      try {
        // fetch clinic vets from API (чтобы узнать кто уже привязан)
        const resp = await apiInstance.get(`/profiles/vets/by-clinic/${clinicId}`);
        const clinicVets: IVet[] = resp.data;
        const clinicVetIds = clinicVets.map((vet) => vet.id);
        // filter vets from store
        const available = vets.filter((vet) => !clinicVetIds.includes(vet.id));
        setAvailableVets(available);
      } catch (error) {
        console.error('Error fetching available vets:', error);
        toast.error('Failed to load available veterinarians');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLinkVet = async () => {
    if (!selectedVetId) {
      toast.error('Please select a veterinarian');
      return;
    }

    try {
      setLinkingVet(true);
      // Call the API to link the vet to the clinic
      await apiInstance.post(`/profiles/clinics/${clinicId}/vets/${selectedVetId}`);

      toast.success('Veterinarian successfully linked to clinic');
      setDialogOpen(false);
      setSelectedVetId('');

      // Callback to refresh parent component
      onVetAdded();
    } catch (error) {
      console.error('Error linking vet to clinic:', error);
      toast.error('Failed to link veterinarian to clinic');
    } finally {
      setLinkingVet(false);
    }
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add Veterinarian</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Link Veterinarian to {clinicName}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="py-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Veterinarian
          </label>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <Select value={selectedVetId} onValueChange={setSelectedVetId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a veterinarian" />
              </SelectTrigger>
              <SelectContent>
                {availableVets.length > 0 ? (
                  availableVets.map((vet) => (
                    <SelectItem key={vet.id} value={vet.id}>
                      {vet.firstName} {vet.lastName} - {vet.specialization}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No available veterinarians
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDialogOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleLinkVet} disabled={!selectedVetId || linkingVet || loading}>
              {linkingVet ? 'Linking...' : 'Link Veterinarian'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
