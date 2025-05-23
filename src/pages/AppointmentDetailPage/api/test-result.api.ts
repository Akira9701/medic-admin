import { toast } from 'sonner';
import apiInstance from '@/shared/api/api.instance';
import { TestResultRequest, TestResultResponse } from '../types';

export const saveTestResult = async (
  petId: string,
  testData: TestResultRequest,
): Promise<TestResultResponse | null> => {
  try {
    const response = await apiInstance.post<TestResultResponse>(
      `/appointments/${petId}/test-result`,
      testData,
    );

    toast.success('Результаты анализов успешно сохранены');
    return response.data;
  } catch (error) {
    console.error('Failed to save test results:', error);
    toast.error('Не удалось сохранить результаты анализов');
    return null;
  }
};
