export interface TestResultRequest {
  testType: string;
  value: number;
  date: string;
  breed: string;
}

export interface TestResultAnalysis {
  normRange: number[];
  prediction: number;
  status: string;
}

export interface TestResultResponse {
  analysis: TestResultAnalysis;
  message: string;
}
