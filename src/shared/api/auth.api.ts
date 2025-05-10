import apiInstance from './api.instance';

const authApi = {
  login: async (
    email: string,
    password: string,
  ): Promise<{
    token: string;
    type: 'Bearer';
  }> => {
    const response = await apiInstance.post('auth/login', { login: email, password });
    return response.data;
  },

  register: async (
    email: string,
    password: string,
    title: string,
    isClinic: boolean,
  ): Promise<{
    message: string;
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
        userType: 'ADMIN',
      };
    }
    const response = await apiInstance.post('auth/signup', loginData);
    return response.data;
  },
};

export default authApi;
