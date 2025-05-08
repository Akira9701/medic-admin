import { IMedicalRecord, IPet } from '@/entities/Pet/types';
import { EPetType } from '../constants/pet.constants';

export const petMedicalRecordsMock: IMedicalRecord[] = [
  {
    id: '101',
    diagnosis: 'Seasonal allergies',
    treatment: 'Prescribed antihistamines',
    notes: 'Follow up in two weeks if symptoms persist',
    date: '2023-01-15',
    vet: {
      id: '201',
      firstName: 'John',
      lastName: 'Smith',
      specialization: 'General Veterinary Medicine',
      avatarUrl: '/images/vets/smith.jpg',
    },
  },
  {
    id: '102',
    diagnosis: 'Minor laceration on right paw',
    treatment: 'Cleaned and bandaged. Antibiotics prescribed.',
    notes: 'Owner to change bandage daily',
    date: '2023-03-22',
    vet: {
      id: '202',
      firstName: 'Emily',
      lastName: 'Johnson',
      specialization: 'Surgery',
      avatarUrl: '/images/vets/johnson.jpg',
    },
  },
  {
    id: '301',
    diagnosis: 'Metabolic bone disease',
    treatment: 'Calcium supplements and UVB light therapy',
    notes: 'Adjust diet to include more calcium-rich foods',
    date: '2023-09-15',
    vet: {
      id: '203',
      firstName: 'Robert',
      lastName: 'Wilson',
      specialization: 'Exotic Animals',
      avatarUrl: '/images/vets/wilson.jpg',
    },
  },
];

export const petsMock: IPet[] = [
  {
    id: '1',
    name: 'Rex',
    type: EPetType.DOG,
    breed: 'German Shepherd',
    birthDate: '2019-05-15',
    chipNumber: 'CH123456789',
  },
  {
    id: '2',
    name: 'Whiskers',
    type: EPetType.CAT,
    breed: 'Maine Coon',
    birthDate: '2020-10-22',
    chipNumber: 'CH987654321',
  },
  {
    id: '3',
    name: 'Polly',
    type: EPetType.BIRD,
    breed: 'African Grey Parrot',
    birthDate: '2021-03-10',
    chipNumber: 'CH567891234',
  },
  {
    id: '4',
    name: 'Slider',
    type: EPetType.REPTILE,
    breed: 'Bearded Dragon',
    birthDate: '2022-01-05',
    chipNumber: 'CH456789123',
  },
  {
    id: '5',
    name: 'Hammy',
    type: EPetType.RODENT,
    breed: 'Syrian Hamster',
    birthDate: '2022-11-30',
    chipNumber: 'CH567812345',
  },
  {
    id: '6',
    name: 'Bubbles',
    type: EPetType.OTHER,
    breed: 'Goldfish',
    birthDate: '2023-02-15',
    chipNumber: 'N/A',
  },
];
