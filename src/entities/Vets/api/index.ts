import { IVet } from '@/entities/Vets/types';
import apiInstance from '@/shared/api/api.instance';

const vetsApi = {
  getVets: async ({ id }: { id: string }): Promise<IVet[]> => {
    const response = await apiInstance.get<IVet[]>(`/profiles/vets/by-clinic/${id}`);
    return response.data;
  },
  addVetToClinic: async (vetId: string): Promise<void> => {
    // const response = await apiInstance.post(`/vets/${vetId}/clinic`);
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  getVetById: async (vetId: string): Promise<IVet> => {
    // const response = await apiInstance.get(`/vets/${vetId}`);
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(clinicVetsMock.find((vet) => vet.id === vetId) as IVet);
      }, 1000);
    });
  },
  getAllVets: async (): Promise<IVet[]> => {
    const response = await apiInstance.get<IVet[]>('/profiles/vets');
    return response.data;
  },
};

export default vetsApi;
