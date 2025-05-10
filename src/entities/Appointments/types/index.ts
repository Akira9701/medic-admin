export interface IAppointment {
  id: number;
  vetId: string;
  petId: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string;
}

export enum AppointmentStatus {
  BOOKED = 'BOOKED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
