'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { registerRoute } from '@/app/router/lib/constants';
import { Link } from 'react-router';
import { TitleSwitcher } from '@/shared/ui/title-switcher';

// Improved schema with additional validation rules
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
});

interface ILoginForm {
  isLoading: boolean;
  onSubmit: (email: string, password: string) => void;
  isClinic: boolean;
  setIsClinic: (checked: boolean) => void;
}

export default function LoginForm({ onSubmit, isLoading, isClinic, setIsClinic }: ILoginForm) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
        <Card className="mx-auto w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => {
                  onSubmit(data.email, data.password);
                })}
                className="space-y-8">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder={isClinic ? 'clinic@example.com' : 'doctor@example.com'}
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <div className="flex justify-between items-center">
                          <FormLabel htmlFor="password">Password</FormLabel>
                          {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                          Forgot your password?
                        </Link> */}
                        </div>
                        <FormControl>
                          <PasswordInput
                            id="password"
                            placeholder="******"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <TitleSwitcher isChecked={isClinic} setIsChecked={setIsClinic} title="Clinic" />
                  <Button loading={isLoading} type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to={registerRoute} className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
