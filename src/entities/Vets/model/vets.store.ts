import { create } from 'zustand';
import { IVet } from '../types';

interface IVetsStore {
  vets: IVet[] | null;
}

const useVetsStore = create<IVetsStore>(() => ({
  vets: null,
}));

export const setVets = (vets: IVet[]) => {
  useVetsStore.setState({ vets });
};

export const addVet = (vet: IVet) => {
  useVetsStore.setState((state) => ({ vets: state.vets ? [...state.vets, vet] : [vet] }));
};

export const updateVet = (vet: Partial<IVet>) => {
  useVetsStore.setState((state) => ({
    vets: state.vets?.map((v) => (v.id === vet.id ? { ...v, ...vet } : v)),
  }));
};

export const deleteVet = (id: string) => {
  useVetsStore.setState((state) => ({
    vets: state.vets?.filter((v) => v.id !== id),
  }));
};

export default useVetsStore;
