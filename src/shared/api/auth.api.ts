// import axios from 'axios';
// import apiInstance from './api.instance';

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
    console.log(email, password);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: '1234567890',
          type: 'Bearer',
        });
      }, 1000);
    });
  },
};

export default authApi;
