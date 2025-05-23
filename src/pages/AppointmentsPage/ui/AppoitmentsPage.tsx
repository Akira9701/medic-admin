import { useEffect } from 'react';
import useAppointmentsStore, {
  setAppointments,
} from '@/entities/Appointments/model/appointments.store';
import apointmentsApi from '@/entities/Appointments/api';
import useUserStore from '@/entities/User/model/user.store';
import { LoaderPinwheel } from 'lucide-react';
import { AppointmentsTable } from './components';

const AppointmentsPage = () => {
  const appointments = useAppointmentsStore((state) => state.appointments);
  const vetId = useUserStore((state) => state.user?.id);

  useEffect(() => {
    if (!vetId) return;
    apointmentsApi.getAppointments().then((appointments) => {
      setAppointments(appointments);
    });
  }, []);

  return (
    <div className="w-full h-full relative">
      <h2 className="mt-10 mb-3 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Appointments
      </h2>

      {appointments.length > 0 ? (
        <AppointmentsTable appointments={appointments} />
      ) : (
        <div className="absolute h-fit w-fit inset-0 m-auto">
          <LoaderPinwheel className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
