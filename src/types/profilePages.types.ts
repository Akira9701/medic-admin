import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';

export type ClinicPageChangeHandlerKey = keyof Omit<IClinic, 'services' | 'workingHours' | 'vets'>;

export type VetPageChangeHandlerKey = keyof Omit<IVet, 'services' | 'clinic'>;
