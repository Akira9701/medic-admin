import { IVet } from '@/entities/Vets/types';
import { clinicVetsMock, otherVetsMock } from '@/shared/mocks/vet.mock';

const vetsApi = {
  getVets: async (): Promise<IVet[]> => {
    // const response = await apiInstance.get('/vets');
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...clinicVetsMock, ...otherVetsMock]);
      }, 1000);
    });
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
};

export default vetsApi;
