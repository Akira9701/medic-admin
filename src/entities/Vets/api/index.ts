import { IVet } from '@/entities/Vets/types';
import { vetMock } from '@/shared/mocks/vet.mock';

const vetsApi = {
  getVets: async (): Promise<IVet[]> => {
    // const response = await apiInstance.get('/vets');
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([vetMock]);
      }, 1000);
    });
  },
};

export default vetsApi;
