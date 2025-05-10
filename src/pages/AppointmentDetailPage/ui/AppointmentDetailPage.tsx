import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IAppointment } from '@/entities/Appointments/types';
import { Button } from '@/shared/ui/button';
import {
  PawPrint,
  CalendarClock,
  AlertCircle,
  FileText,
  ChevronLeft,
  Edit,
  Trash,
  Check,
  X,
  FileDown,
  TestTube,
} from 'lucide-react';
import { toast } from 'sonner';
import apiInstance from '@/shared/api/api.instance';
import { IPet } from '@/entities/Pet/types';
import useAppointmentsStore, {
  updateAppointment,
} from '@/entities/Appointments/model/appointments.store';
import {
  generateAppointmentReport,
  updateAppointmentStatus,
  deleteAppointment,
} from '../api/appointment.api';
import { saveTestResult } from '../api/test-result.api';
import { TestResultRequest, TestResultResponse } from '../types';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { DialogClose } from '@/shared/ui/dialog';

const AppointmentDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const appointments = useAppointmentsStore((state) => state.appointments);
  const [appointment, setAppointment] = useState<IAppointment | null>(null);
  const [pet, setPet] = useState<IPet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingReport, setGeneratingReport] = useState<boolean>(false);
  const [testDialogOpen, setTestDialogOpen] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestResultResponse | null>(null);
  const [testData, setTestData] = useState<TestResultRequest>({
    testType: '',
    value: 0,
    date: new Date().toISOString().split('T')[0],
    breed: '',
  });
  const [savingTestResult, setSavingTestResult] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get appointment from store
        const foundAppointment = appointments.find((a) => a.id === Number(id));

        if (!foundAppointment) {
          setError('Appointment not found');
          setLoading(false);
          return;
        }

        setAppointment(foundAppointment);

        // Fetch pet details if needed
        if (foundAppointment.petId) {
          try {
            const petResponse = await apiInstance.get(`/pets/${foundAppointment.petId}`);
            setPet(petResponse.data);
            // Pre-fill breed in test data
            setTestData((prev) => ({
              ...prev,
              breed: petResponse.data.breed || '',
            }));
          } catch {
            // If pet fetch fails, we can still show the appointment
            console.error('Failed to fetch pet details');
          }
        }

        setLoading(false);
      } catch {
        setError('Failed to load appointment details');
        setLoading(false);
        toast.error('Failed to load appointment details');
      }
    };

    fetchData();
  }, [id, appointments]);

  const handleStatusChange = async (newStatus: string) => {
    if (!appointment) return;

    const success = await updateAppointmentStatus(String(id), newStatus);

    if (success) {
      // Update in store
      updateAppointment(String(appointment.id), { status: newStatus });

      // Update local state
      setAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const success = await deleteAppointment(String(id));
      if (success) {
        navigate('/appointments');
      }
    }
  };

  const handleBack = () => {
    navigate('/appointments');
  };

  const handleGenerateReport = async () => {
    if (!appointment?.petId) return;

    setGeneratingReport(true);
    await generateAppointmentReport(appointment.petId);
    setGeneratingReport(false);
  };

  const handleTestDataChange = (field: keyof TestResultRequest, value: string | number) => {
    setTestData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveTestResult = async () => {
    if (!appointment?.petId) return;

    setSavingTestResult(true);
    const result = await saveTestResult(String(appointment.petId), testData);
    setSavingTestResult(false);

    if (result) {
      setTestResult(result);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error || !appointment) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500 mb-4">{error || 'Appointment not found'}</p>
        <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
          <ChevronLeft size={16} /> Back to Appointments
        </Button>
      </div>
    );
  }

  // Format dates from strings
  const startTime = new Date(appointment.startTime);
  const endTime = new Date(appointment.endTime);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
          <ChevronLeft size={16} /> Back to Appointments
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(`/appointments/edit/${id}`)}>
            <Edit size={16} /> Edit
          </Button>
          <Button variant="destructive" className="flex items-center gap-2" onClick={handleDelete}>
            <Trash size={16} /> Delete
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-200">
          Appointment Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Pet Information */}
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                <PawPrint className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Pet Information</h2>
                {pet ? (
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">Name:</span> {pet.name}
                    </p>
                    <p>
                      <span className="font-medium">Type:</span> {pet.type}
                    </p>
                    <p>
                      <span className="font-medium">Breed:</span> {pet.breed}
                    </p>
                    <p>
                      <span className="font-medium">ID:</span> {appointment.petId}
                    </p>
                  </div>
                ) : (
                  <p>Pet ID: {appointment.petId}</p>
                )}
              </div>
            </div>

            {/* Vet Information */}
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                <CalendarClock className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Appointment Time</h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Date:</span>{' '}
                    {startTime.toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                  <p>
                    <span className="font-medium">Start Time:</span>{' '}
                    {startTime.toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p>
                    <span className="font-medium">End Time:</span>{' '}
                    {endTime.toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                <TestTube className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Test Results</h2>
                <Dialog open={testDialogOpen} onOpenChange={setTestDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">Add Test Result</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add Test Result</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="testType" className="text-right">
                          Test Type
                        </Label>
                        <Input
                          id="testType"
                          value={testData.testType}
                          onChange={(e) => handleTestDataChange('testType', e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="value" className="text-right">
                          Value
                        </Label>
                        <Input
                          id="value"
                          type="number"
                          value={testData.value}
                          onChange={(e) => handleTestDataChange('value', Number(e.target.value))}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={testData.date}
                          onChange={(e) => handleTestDataChange('date', e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="breed" className="text-right">
                          Breed
                        </Label>
                        <Input
                          id="breed"
                          value={testData.breed}
                          onChange={(e) => handleTestDataChange('breed', e.target.value)}
                          className="col-span-3"
                        />
                      </div>

                      {testResult && (
                        <div className="mt-4 p-4 border rounded-md bg-gray-50">
                          <h3 className="font-medium mb-2">Analysis Results:</h3>
                          <p>
                            <span className="font-medium">Status:</span>{' '}
                            {testResult.analysis?.status || 'N/A'}
                          </p>
                          <p>
                            <span className="font-medium">Normal Range:</span>{' '}
                            {testResult.analysis?.normRange
                              ? testResult.analysis.normRange.join(' - ')
                              : 'N/A'}
                          </p>
                          <p>
                            <span className="font-medium">Prediction:</span>{' '}
                            {testResult.analysis?.prediction ?? 'N/A'}
                          </p>
                          <p className="mt-2">
                            <span className="font-medium">Message:</span>{' '}
                            {testResult.message || 'N/A'}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={handleSaveTestResult}
                        disabled={savingTestResult || !testData.testType}>
                        {savingTestResult ? 'Saving...' : 'Save Test Result'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Status</h2>
                <div className="flex items-center mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : appointment.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={appointment.status === 'active' ? 'default' : 'outline'}
                    className="flex items-center gap-1"
                    onClick={() => handleStatusChange('active')}>
                    <Check size={16} /> Active
                  </Button>
                  <Button
                    size="sm"
                    variant={appointment.status === 'completed' ? 'default' : 'outline'}
                    className="flex items-center gap-1"
                    onClick={() => handleStatusChange('completed')}>
                    <Check size={16} /> Completed
                  </Button>
                  <Button
                    size="sm"
                    variant={appointment.status === 'cancelled' ? 'default' : 'outline'}
                    className="flex items-center gap-1"
                    onClick={() => handleStatusChange('cancelled')}>
                    <X size={16} /> Cancelled
                  </Button>
                </div>
              </div>
            </div>

            {/* Notes */}
            {appointment.notes && (
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Notes</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">{appointment.notes}</p>
                </div>
              </div>
            )}

            {/* Generate Report Button */}
            <div className="flex items-start space-x-4 pt-4">
              <div className="p-3 rounded-lg bg-gray-50 text-gray-600">
                <FileDown className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Report</h2>
                <Button
                  onClick={handleGenerateReport}
                  disabled={generatingReport || !appointment.petId}
                  className="flex items-center gap-2">
                  {generatingReport ? 'Generating...' : 'Generate Report'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
