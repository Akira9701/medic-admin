export interface IVet {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  qualification: string;
  bio: string;
  email: string;
  avatarUrl: string;
  clinic: {
    id: string;
    name: string;
    logoUrl: string;
  };
  services: string[];
  address: {
    city: string;
    street: string;
    building: string;
  };
}
