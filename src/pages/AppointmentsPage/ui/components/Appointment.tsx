import { FC } from 'react';
import { IAppointment } from '@/entities/Appointments/types';
import { PawPrint, CalendarClock, AlertCircle } from 'lucide-react';

interface IAppointmentComponent {
  appointment: IAppointment;
}

const Appointment: FC<IAppointmentComponent> = ({ appointment }) => {
  return (
    <div className="rounded-lg border border-gray-200 p-5 max-w-sm shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col space-y-4">
        {/* Заголовок с иконкой */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
            <PawPrint className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-gray-900 truncate">{appointment.petName}</p>
            <p className="text-sm text-gray-500">{appointment.ownerName}</p>
          </div>
        </div>

        {/* Дата и время с иконкой */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
            <CalendarClock className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">
              {appointment.dateTime.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
              <span className="mx-1">·</span>
              {appointment.dateTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Статус с иконкой */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">
              Status:
              <span
                className={`ml-1 font-medium ${
                  appointment.status === 'active' ? 'text-gray-900' : 'text-gray-600'
                }`}>
                {appointment.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
