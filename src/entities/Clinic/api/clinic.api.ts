import { IVet } from '@/entities/Vets/types';
import { IClinic, ICreateClinic } from '../types';
import apiInstance from '@/shared/api/api.instance';

export const clinicApi = {
  getClinic: async ({ id }: { id: string }): Promise<IClinic> => {
    const respone = await apiInstance.get<IClinic>(`/profiles/clinics/${id}`);
    return respone.data;
  },

  createClinic: async (clinic: Omit<ICreateClinic, 'id'>): Promise<IClinic> => {
    const response = await apiInstance.post('/profiles/clinics', clinic);
    return response.data;
  },

  deleteVetFromClinic: async (clinicId: string, vetId: string): Promise<void> => {
    await apiInstance.delete(`/profiles/clinics/${clinicId}/vets/${vetId}`);
  },

  getClinicVets: async (clinicId: string): Promise<IVet[]> => {
    const response = await apiInstance.get<IVet[]>(`/profiles/vets/by-clinic/${clinicId}`);
    return response.data;
  },

  getAllVets: async (): Promise<IVet[]> => {
    const response = await apiInstance.get<IVet[]>('/profiles/vets/all');
    return response.data;
  },

  getAllClinics: async (): Promise<IClinic[]> => {
    const respone = await apiInstance.get<IClinic[]>('/profiles/clinics/all');
    return respone.data;
  },
  getVetById: async ({ id }: { id: string }): Promise<IVet> => {
    const response = await apiInstance.get<IVet>(`/profiles/vets/by-clinic/${id}`);
    return response.data;
  },
  updateClinicProfile: async (clinic: IClinic): Promise<IClinic> => {
    const response = await apiInstance.put(`/profiles/clinics/${clinic.id}`, clinic);
    return response.data;
  },
};

export default clinicApi;
