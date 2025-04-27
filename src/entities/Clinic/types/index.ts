export interface IClinic {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  building: string;
  postalCode: string;
  services: string[];
  logoUrl: string;
  workingHours: string[];
  vets: [
    {
      id: string;
      firstName: string;
      lastName: string;
      specialization: string;
      avatarUrl: string;
    },
  ];
}
