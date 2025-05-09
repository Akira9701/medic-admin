import { IVet } from '@/entities/Vets/types';
import { clinicVetsMock, otherVetsMock } from '@/shared/mocks/vet.mock';
import { IClinic } from '../types';
import apiInstance from '@/shared/api/api.instance';

export const clinicApi = {
  getClinic: async ({ id }: { id: string }): Promise<IClinic> => {
    const respone = await apiInstance.get<IClinic>(`/profiles/clinics/${id}`);
    return respone.data;
  },

  deleteVetFromClinic: async (clinicId: string, vetId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Удаление ветеринара ${vetId} из клиники ${clinicId}`);
        resolve();
      }, 1000);
    });
  },

  getClinicVets: async (clinicId: string): Promise<IVet[]> => {
    const response = await apiInstance.get<IVet[]>(`/profiles/vets/by-clinic/${clinicId}`);
    return response.data;
  },

  getAllVets: async (): Promise<IVet[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(otherVetsMock);
      }, 1000);
    });
  },

  getAllClinics: async (): Promise<IClinic[]> => {
    const respone = await apiInstance.get<IClinic[]>('/profiles/clinics/all');
    return respone.data;
  },
  getVetById: async ({ id }: { id: string }): Promise<IVet> => {
    const response = await apiInstance.get<IVet>(`/profiles/vets/by-clinic/${id}`);
    return response.data;
  }
};

