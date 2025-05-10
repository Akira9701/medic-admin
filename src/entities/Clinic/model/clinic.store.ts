import { create } from 'zustand';
import { IClinic } from '../types';

interface IClinicStore {
  clinics: IClinic[] | null;
}

const useClinicStore = create<IClinicStore>(() => ({
  clinics: null,
}));

export const setClinics = (clinics: IClinic[]) => {
  useClinicStore.setState({ clinics });
};

export const addClinic = (clinic: IClinic) => {
  useClinicStore.setState((state) => ({
    clinics: state.clinics ? [...state.clinics, clinic] : [clinic],
  }));
};


export default useClinicStore;
