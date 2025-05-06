import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';
import { create } from 'zustand';

type userType = IClinic | IVet | null;
interface IUserStore {
  user: userType;
}

const useUserStore = create<IUserStore>(() => ({
  user: null,
}));

export const setUser = <T extends userType>(user: T) => {
  useUserStore.setState({ user });
};

export const updateUser = <T extends userType>(user: Partial<T>) => {
  useUserStore.setState((state) => ({
    user: { ...state.user, ...user } as T,
  }));
};

export const clearUser = () => {
  useUserStore.setState({ user: null });
};

export default useUserStore;
