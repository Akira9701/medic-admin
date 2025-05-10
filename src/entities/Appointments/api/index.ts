// import apiInstance from '@/shared/api/api.instance';
import { IAppointment } from '../types';
import apiInstance from '@/shared/api/api.instance';

const apointmentsApi = {
  getAppointments: async (): Promise<IAppointment[]> => {
    const response = await apiInstance.get(`/appointments/all`);
    return response.data;
  },
};

export default apointmentsApi;
