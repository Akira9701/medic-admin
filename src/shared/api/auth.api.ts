// import axios from 'axios';
// import apiInstance from './api.instance';
import { clinicMock } from '../mocks/clinic.mock';
import { vetMock } from '../mocks/vet.mock';

const authApi = {
  login: async (
    email: string,
    password: string,
    isClinic: boolean,
  ): Promise<{
    token: string;
    type: 'Bearer';
  }> => {
    // const response = await apiInstance.post('/api/auth/login', { email, password });
    // return response.data;
    console.log(email, password, isClinic);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: isClinic ? clinicMock : vetMock,
          type: 'Bearer',
        });
      }, 1000);
    });
  },

  register: async (
    email: string,
    password: string,
    isClinic: boolean,
  ): Promise<{
    token: string;
  }> => {
    console.log(email, password, isClinic);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: isClinic ? clinicMock : vetMock,
        });
      }, 1000);
    });
  },
};

export default authApi;
