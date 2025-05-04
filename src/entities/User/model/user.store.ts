import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vet/types';
import { create } from 'zustand';

interface IUserStore {
  user: IClinic | IVet | null;
}

const useUserStore = create<IUserStore>(() => ({
  user: {
    id: '65a1bc4e3f8d9c1f2e7f8a9b',
    name: 'ВетКлиника №1',
    description: 'Современная ветеринарная клиника с полным спектром услуг',
    phone: '+79161234567',
    email: 'clinic@example.com',
    city: 'Москва',
    street: 'Ленина',
    building: '10',
    postalCode: '123456',
    services: ['Стационар', 'Лаборатория', 'Рентген'],
    logoUrl: 'https://example.com/logo.png',
    workingHours: ['Пн-Пт: 9:00-18:00', 'Сб: 10:00-15:00'],
    vets: [
      {
        id: 'string',
        firstName: 'string',
        lastName: 'string',
        specialization: 'string',
        avatarUrl: 'string',
      },
    ],
  },
}));

export const setUser = (user: IClinic | IVet | null) => {
  useUserStore.setState({ user });
};

export const updateUser = (user: Partial<IClinic> | Partial<IVet>) => {
  useUserStore.setState((state) => ({
    user: { ...state.user, ...user } as IClinic | IVet,
  }));
};

export const clearUser = () => {
  useUserStore.setState({ user: null });
};

export default useUserStore;
