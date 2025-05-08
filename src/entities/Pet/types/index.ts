import { EPetType } from '@/shared/constants/pet.constants';

export interface IPet {
  id: string;
  name: string;
  type: EPetType;
  breed: string;
  birthDate: string;
  chipNumber: string;
}

export interface IMedicalRecord {
  id: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  date: string;
  vet: {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
    avatarUrl: string;
  };
}
