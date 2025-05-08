import { IVet } from '@/entities/Vets/types';
import { clinicVetsMock } from '@/shared/mocks/vet.mock';
import { IClinic } from '../types';
import { clinicMock } from '@/shared/mocks/clinic.mock';

export const clinicApi = {
  getClinic: async (): Promise<IClinic> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(clinicMock);
      }, 1000);
    });
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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(clinicVetsMock);
      }, 1000);
    });
  },
};
