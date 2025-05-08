import { z } from 'zod';

// Define medical record form schema using Zod
export const medicalRecordSchema = z.object({
  diagnosis: z.string().min(3, { message: 'Diagnosis must be at least 3 characters' }),
  treatment: z.string().min(3, { message: 'Treatment must be at least 3 characters' }),
  notes: z.string().optional(),
});

export type MedicalRecordFormValues = z.infer<typeof medicalRecordSchema>;
