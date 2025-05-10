interface IAppointment {
  id: number;
  vetId: string;
  petId: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string;
}

export type { IAppointment };
