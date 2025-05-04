import { rootRoute } from '@/app/router/lib/constants';
import { useNavigate } from 'react-router';
import LoginForm from './components/LoginForm';
import userApi from '@/entities/User/api/user.api';
import { setUser } from '@/entities/User/model/user.store';
import { delay } from '@/shared/lib/utils/delay.utils';
import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';
import { useState } from 'react';
import { setIsShowLoader } from '@/entities/Auth/model/auth.store';
import { toast } from 'sonner';
import authApi from '@/shared/api/auth.api';
import authToken from '@/shared/localstorage/authToken';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(email: string, password: string) {
    setIsLoading(true);
    try {
      // Assuming an async login function
      const authResponse = await authApi.login(email, password);
      const userResponse = await userApi.getUser();
      setUser(userResponse as IClinic | IVet | null);
      setIsShowLoader(true);
      toast.success('Login successful');
      navigate(rootRoute);
      delay(400).then(() => {
        setIsShowLoader(false);
      });
      authToken.set(authResponse.data.token);

      //   const userResponse = await userApi.getUser();
      //   if (userResponse) {
      //     setUser(userResponse as IClinic | IVet | null);
      //   }
      //   toast(
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      //     </pre>,
      //   );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <LoginForm isLoading={isLoading} onSubmit={onSubmit} />
    </>
  );
}
