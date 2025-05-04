import { IVet } from '@/entities/Vets/types';

export const vetMock: IVet = {
  id: '65a1bc4e3f8d9c1f2e7f8a9c',
  firstName: 'Иван',
  lastName: 'Петров',
  specialization: 'Хирург',
  qualification: 'Высшая категория',
  bio: 'Специалист по ортопедическим операциям',
  email: 'vet@example.com',
  avatarUrl: 'https://example.com/avatar.jpg',
  clinic: {
    id: 'string',
    name: 'string',
    logoUrl: 'string',
  },
  services: ['Операции', 'Консультации'],
  address: {
    city: 'string',
    street: 'string',
    building: 'string',
  },
};
