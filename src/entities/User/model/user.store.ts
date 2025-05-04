import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';
import { clinicMock } from '@/shared/mocks/clinic.mock';
import { create } from 'zustand';

interface IUserStore {
  user: IClinic | IVet | null;
}

const useUserStore = create<IUserStore>(() => ({
  user: clinicMock,
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
