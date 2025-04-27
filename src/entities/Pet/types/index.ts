export interface IPet {
  name: string;
  type: PetType;
  breed: string;
  birthDate: string;
  chipNumber: string;
}

export enum PetType {
  DOG = 'DOG',
  CAT = 'CAT',
}
