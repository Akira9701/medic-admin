// import axios from 'axios';
// import apiInstance from './api.instance';
import { clinicMock } from '../mocks/clinic.mock';
import { vetMock } from '../mocks/vet.mock';
import apiInstance from './api.instance';

const authApi = {
  login: async (
    email: string,
    password: string,
  ): Promise<{
    token: string;
    type: 'Bearer';
  }> => {
    // const response = await apiInstance.post('/api/auth/login', { email, password });
    // return response.data;
    const response = await apiInstance.post('auth/login', { login: email, password });
    return response.data;
  },

  register: async (
    email: string,
    password: string,
    title: string,
    isClinic: boolean,
  ): Promise<{
    token: string;
  }> => {
    let loginData = {};
    if (isClinic) {
      loginData = { email, password, title };
    } else {
      const name = title.split(' ')[0];
      const surname = title.split(' ')[1];
      loginData = {
        login: email,
        password,
        email,
        name,
        surname,
        userType: 'VET_USER_CLINIC',
      };
    }
    console.log('register', loginData);
    const response = await apiInstance.post('auth/signup', loginData);
    return response.data;
  },
};

export default authApi;
