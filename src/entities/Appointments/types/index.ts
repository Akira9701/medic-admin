interface IAppointment {
  id: string;
  dateTime: Date;
  petName: string;
  ownerName: string;
  status: string;
}

export type { IAppointment };
