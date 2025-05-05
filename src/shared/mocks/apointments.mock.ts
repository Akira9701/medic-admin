import { IAppointment } from '@/entities/Appointments/types';

export const apointmentsMock: IAppointment[] = [
  {
    id: '1',
    dateTime: new Date('2021-01-01'),
    petName: 'Rex',
    ownerName: 'John Doe',
    status: 'pending',
  },
  {
    id: '2',
    dateTime: new Date('2021-01-02'),
    petName: 'Bella',
    ownerName: 'Jane Smith',
    status: 'pending',
  },
  {
    id: '3',
    dateTime: new Date('2021-01-03'),
    petName: 'Max',
    ownerName: 'Michael Brown',
    status: 'pending',
  },
];
