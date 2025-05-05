// import apiInstance from '@/shared/api/api.instance';
import { apointmentsMock } from '@/shared/mocks/apointments.mock';
import { IAppointment } from '../types';

const apointmentsApi = {
  getAppointments: async (vetId: string): Promise<IAppointment[]> => {
    // const response = await apiInstance.get(`/vets/appointments/${vetId}/appointments`);
    // return response.data;
    console.log('getAppointments', vetId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(apointmentsMock);
      }, 1000);
    });
  },
};

export default apointmentsApi;
