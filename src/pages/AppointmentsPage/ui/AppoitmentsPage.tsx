import { useEffect } from 'react';
import useAppointmentsStore, {
  setAppointments,
} from '@/entities/Appointments/model/appointments.store';
import apointmentsApi from '@/entities/Appointments/api';
import { useNavigate } from 'react-router';
import useUserStore from '@/entities/User/model/user.store';
import Appointment from './components/Appointment';

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const appointments = useAppointmentsStore((state) => state.appointments);
  const vetId = useUserStore((state) => state.user?.id);

  useEffect(() => {
    if (!vetId) return;
    apointmentsApi.getAppointments(vetId).then((appointments) => {
      setAppointments(appointments);
    });
  }, []);

  return (
    <div>
      <h2 className="mt-10 mb-3 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Appointments
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <Appointment appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

export default AppointmentsPage;
