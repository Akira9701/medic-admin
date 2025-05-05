import { create } from 'zustand';
import { IAppointment } from '../types';

interface IAppointmentsStore {
  appointments: IAppointment[];
}

const useAppointmentsStore = create<IAppointmentsStore>(() => ({
  appointments: [],
}));

export const setAppointments = (appointments: IAppointment[]) => {
  useAppointmentsStore.setState({ appointments });
};

export const updateAppointment = (id: string, settings: Partial<IAppointment>) => {
  useAppointmentsStore.setState((state) => ({
    appointments: state.appointments.map((a) => (a.id === id ? { ...a, ...settings } : a)),
  }));
};

export default useAppointmentsStore;
