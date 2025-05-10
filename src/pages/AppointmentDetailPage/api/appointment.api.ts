import apiInstance from '@/shared/api/api.instance';
import { toast } from 'sonner';

// Function to generate and download a PDF report
export const generateAppointmentReport = async (petId: number | string): Promise<boolean> => {
  try {
    const response = await apiInstance.get(`/appointments/${petId}/report`, {
      responseType: 'blob',
    });

    // Create a URL for the blob
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));

    // Create a temporary link element
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', `pet_report_${petId}.pdf`);

    // Append to the document, click it and remove it
    document.body.appendChild(fileLink);
    fileLink.click();
    document.body.removeChild(fileLink);

    toast.success('Отчет успешно загружен');
    return true;
  } catch (error) {
    console.error('Error generating report:', error);
    toast.error('Не удалось сгенерировать отчет');
    return false;
  }
};

// Function to update appointment status
export const updateAppointmentStatus = async (
  appointmentId: string,
  newStatus: string,
): Promise<boolean> => {
  try {
    await apiInstance.patch(`/appointments/${appointmentId}`, { status: newStatus });
    toast.success(`Статус приема изменен на ${newStatus}`);
    return true;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    toast.error('Не удалось обновить статус приема');
    return false;
  }
};

// Function to delete appointment
export const deleteAppointment = async (appointmentId: string): Promise<boolean> => {
  try {
    await apiInstance.delete(`/appointments/${appointmentId}`);
    toast.success('Прием успешно удален');
    return true;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    toast.error('Не удалось удалить прием');
    return false;
  }
};
