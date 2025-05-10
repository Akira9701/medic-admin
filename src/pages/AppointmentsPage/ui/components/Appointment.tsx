import { FC } from 'react';
import { IAppointment } from '@/entities/Appointments/types';
import { PawPrint, CalendarClock, AlertCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IAppointmentComponent {
  appointment: IAppointment;
}

const Appointment: FC<IAppointmentComponent> = ({ appointment }) => {
  const navigate = useNavigate();

  // Format dates from strings
  const startTime = new Date(appointment.startTime);
  const endTime = new Date(appointment.endTime);

  const handleClick = () => {
    navigate(`/appointment/${appointment.id}`);
  };

  return (
    <div
      className="rounded-lg h-fit border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={handleClick}>
      <div className="flex flex-col space-y-4">
        {/* Pet ID with icon */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
            <PawPrint className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-gray-900 truncate">
              Pet ID: {appointment.petId}
            </p>
            <p className="text-sm text-gray-500">Vet ID: {appointment.vetId}</p>
          </div>
        </div>

        {/* Date and time with icon */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
            <CalendarClock className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">
              {startTime.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
              <span className="mx-1">·</span>
              {startTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              <span className="mx-1">-</span>
              {endTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Status with icon */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700">
              Status:
              <span
                className={`ml-1 font-medium ${
                  appointment.status === 'active'
                    ? 'text-green-600'
                    : appointment.status === 'cancelled'
                      ? 'text-red-600'
                      : appointment.status === 'completed'
                        ? 'text-blue-600'
                        : 'text-gray-600'
                }`}>
                {appointment.status}
              </span>
            </p>
          </div>
        </div>

        {/* Notes with icon */}
        {appointment.notes && (
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 truncate">{appointment.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
