// import apiInstance from '@/shared/api/api.instance';
import { clinicMock } from '@/shared/mocks/clinic.mock';

const userApi = {
  getUser: async () => {
    // const response = apiInstance.get('/auth/user');
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(clinicMock);
      }, 3000);
    });
  },
};

export default userApi;
