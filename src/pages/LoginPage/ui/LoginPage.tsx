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
import { decodeToken, getUserTypeFromToken } from '@/shared/lib/utils/jwt.utils';
import { setVets } from '@/entities/Vets/model/vets.store';
import { fetchPets } from '@/entities/Pet/model/pet.store';
import vetsApi from '@/entities/Vets/api';
import clinicApi from '@/entities/Clinic/api/clinic.api';
import { setClinics } from '@/entities/Clinic/model/clinic.store';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isClinic, setIsClinic] = useState(false);

  async function onSubmit(email: string, password: string) {
    setIsLoading(true);
    try {
      // Authenticate user
      const authResponse = await authApi.login(email, password);

      // Set authentication token
      authToken.set(authResponse.token);

      // Decode the JWT token
      const decodedToken = decodeToken(authResponse.token);
      if (!decodedToken) {
        throw new Error('Invalid token received');
      }
      const vets = await vetsApi.getAllVets();
      setVets(vets);

      const clinics = await clinicApi.getAllClinics();
      setClinics(clinics);

      await fetchPets();

      // Determine user type from token

      setIsShowLoader(true);

      delay(300)
        .then(async () => {
          navigate(rootRoute);
          const userType = getUserTypeFromToken(authResponse.token);
          // Set user data directly from token payload when possible
          if (userType === 'clinic' || userType === 'vet') {
            // Safe to cast as we've already verified the token structure with getUserTypeFromToken
            setUser(decodedToken as unknown as IClinic | IVet);
          } else {
            // Fallback to API call if token doesn't have enough information
            const userResponse = await userApi.getUser();
            setUser(userResponse as IClinic | IVet | null);
          }

          // Show loader for transition
          toast.success('Login successful');
        })
        .then(() => {
          // Hide loader after delay
          delay(400).then(async () => {
            setIsShowLoader(false);
          });
        });

      // Hide loader after delay
      delay(400).then(async () => {
        setIsShowLoader(false);
      });
    } catch (error) {
      console.error('Login error', error);
      toast.error('Failed to login. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Handle clinic/vet toggle
  const handleClinicToggle = (checked: boolean) => {
    setIsClinic(checked);
  };

  return (
    <>
      <LoginForm
        isLoading={isLoading}
        onSubmit={onSubmit}
        isClinic={isClinic}
        setIsClinic={handleClinicToggle}
      />
    </>
  );
}
