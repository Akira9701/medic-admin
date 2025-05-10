import { toast } from 'sonner';
import apiInstance from '@/shared/api/api.instance';
import { IPet } from '@/entities/Pet/types';

/**
 * Fetches pet details by ID
 * @param petId - The ID of the pet to fetch
 * @returns The pet data or null if there was an error
 */
export const fetchPetDetails = async (petId: string | number): Promise<IPet | null> => {
  try {
    const response = await apiInstance.get<IPet>(`/profiles/pets/${petId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch pet details:', error);
    toast.error('Failed to load pet information');
    return null;
  }
};
