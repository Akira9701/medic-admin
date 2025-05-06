// import apiInstance from '@/shared/api/api.instance';
// import { clinicMock } from '@/shared/mocks/clinic.mock';
import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';
import { clinicMock } from '@/shared/mocks/clinic.mock';
import { vetMock } from '@/shared/mocks/vet.mock';

const userApi = {
  getUser: async (): Promise<IClinic | IVet | null> => {
    // const response = apiInstance.get('/auth/user');
    // return response.data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject(new Error('test'));
        resolve(clinicMock);
      }, 1000);
    });
  },
};

export default userApi;
