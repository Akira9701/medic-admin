import { create } from 'zustand';
import { IVet } from '../types';

interface IClinicVetsStore {
  vets: IVet[] | null;
}

const useClinicVetsStore = create<IClinicVetsStore>(() => ({
  vets: null,
}));

export const setClinicVets = (vets: IVet[]) => {
  useClinicVetsStore.setState({ vets });
};
export const removeClinicVet = (id: string) => {
  useClinicVetsStore.setState((state) => ({
    vets: state.vets ? state.vets.filter((vet) => vet.id !== id) : null,
  }));
};
export const addClinicVet = (vet: IVet) => {
  useClinicVetsStore.setState((state) => ({
    vets: state.vets ? [...state.vets, vet] : [vet],
  }));
};

export default useClinicVetsStore;
