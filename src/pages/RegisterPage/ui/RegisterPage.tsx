'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router';
import { loginRoute, rootRoute } from '@/app/router/lib/constants';
import { TitleSwitcher } from '@/shared/ui/title-switcher';
import { useState } from 'react';
import userApi from '@/entities/User/api/user.api';
import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';
import { setUser } from '@/entities/User/model/user.store';
import { setIsShowLoader } from '@/entities/Auth/model/auth.store';
import { delay } from '@/shared/lib/utils/delay.utils';
import authApi from '@/shared/api/auth.api';
import authToken from '@/shared/localstorage/authToken';
import { decodeToken, getUserTypeFromToken } from '@/shared/lib/utils/jwt.utils';

// Define validation schema using Zod for Vet
const vetFormSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

// Define validation schema for Clinic
const clinicFormSchema = z
  .object({
    name: z.string().min(2, { message: 'Clinic name must be at least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

// Type for form values
type FormValues = z.infer<typeof vetFormSchema> | z.infer<typeof clinicFormSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isClinic, setIsClinic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create form with conditional schema based on isClinic
  const form = useForm<FormValues>({
    resolver: zodResolver(isClinic ? clinicFormSchema : vetFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Reset form when switching between clinic and vet
  const handleClinicToggle = (checked: boolean) => {
    setIsClinic(checked);
    form.reset({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      // Step 1: Register user
      const registerResponse = await authApi.register(
        values.email,
        values.password,
        values.name,
        isClinic,
      );

      if (!registerResponse || !registerResponse.message) {
        throw new Error('Registration failed: No response received');
      }

      // Step 2: Login to get the authentication token
      const authResponse = await authApi.login(values.email, values.password);

      if (!authResponse || !authResponse.token) {
        throw new Error('Login failed after registration: No token received');
      }

      // Step 3: Set authentication token
      authToken.set(authResponse.token);

      // Step 4: Decode the JWT token
      const decodedToken = decodeToken(authResponse.token);
      if (!decodedToken) {
        throw new Error('Invalid token received');
      }

      // Step 5: Determine user type from token
      const userType = getUserTypeFromToken(authResponse.token);

      // Step 6: Set user data in store
      if (userType === 'clinic' || userType === 'vet') {
        // Safe to cast as we've already verified the token structure with getUserTypeFromToken
        setUser(decodedToken as unknown as IClinic | IVet);
      } else {
        // Fallback to API call if token doesn't have enough information
        const userResponse = await userApi.getUser();
        setUser(userResponse as IClinic | IVet | null);
      }

      // Step 7: Show success message and navigate to main app
      toast.success('Registration successful');

      // Show loader during navigation
      setIsShowLoader(true);
      navigate(rootRoute);

      // Hide loader after delay
      delay(400).then(() => {
        setIsShowLoader(false);
      });
    } catch (error) {
      console.error('Registration error', error);
      toast.error(error instanceof Error ? error.message : 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <div className="flex min-h-[70vh] h-full w-full items-center justify-center px-4">
        <Card className="mx-auto w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>Create a new account by filling out the form below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="name">
                          {isClinic ? 'Clinic Name' : 'Full Name'}
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder={isClinic ? 'Animal Care Clinic' : 'John Doe'}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="contact@example.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="password"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="confirmPassword"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <TitleSwitcher
                    isChecked={isClinic}
                    setIsChecked={handleClinicToggle}
                    title="Clinic"
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to={loginRoute} className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
