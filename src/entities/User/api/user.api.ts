// import apiInstance from '@/shared/api/api.instance';
// import { clinicMock } from '@/shared/mocks/clinic.mock';
import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';
import authToken from '@/shared/localstorage/authToken';
import { decodeToken } from '@/shared/lib/utils/jwt.utils';
import { getClinicData } from '@/shared/mocks/clinic.mock';

const userApi = {
  getUser: async (): Promise<IClinic | IVet | null> => {
    // In a real app: const response = await apiInstance.get('/auth/user');

    // For our mock implementation, we'll check if we have a token and decode it
    const token = authToken.get();

    if (token) {
      // If we have a token, decode and return the user data
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        return decodedUser as unknown as IClinic | IVet;
      }
    }

    // Fallback to mock data if no token or invalid token
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getClinicData() as unknown as IClinic);
      }, 500);
    });
  },

  createUser: async (user: IClinic | IVet): Promise<IClinic | IVet> => {
    // const response = apiInstance.post('/auth/user', user);
    // return response.data;
    const mockData = getClinicData();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockData, ...user } as unknown as IClinic | IVet);
      }, 1000);
    });
  },
};

export default userApi;
