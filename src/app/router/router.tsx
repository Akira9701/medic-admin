import ProfilePage from '@/pages/ProfilePage/ui/ProfilePage';
import { createBrowserRouter } from 'react-router';
import {
  appointmentsRoute,
  clinicVetsRoute,
  loginRoute,
  profileRoute,
  registerRoute,
  rootRoute,
  vetsRoute,
  petsRoute,
  petDetailRoute,
} from './lib/constants';
import VetsPage from '@/pages/VetsPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import Root from './root';
import AppointmentsPage from '@/pages/AppointmentsPage/ui/AppoitmentsPage';
import ClinicVetsPage from '@/pages/ClinicVetsPage/ui/ClinicVetsPage';
import PetListPage from '@/pages/PetListPage/ui/PetListPage';
import PetDetailPage from '@/pages/PetDetailPage/ui/PetDetailPage';

const router = createBrowserRouter([
  {
    path: rootRoute,
    element: <Root />,
    children: [
      {
        path: profileRoute,
        element: <ProfilePage />,
      },
      {
        path: vetsRoute,
        element: <VetsPage />,
      },
      {
        path: loginRoute,
        element: <LoginPage />,
      },
      {
        path: registerRoute,
        element: <RegisterPage />,
      },
      {
        path: appointmentsRoute,
        element: <AppointmentsPage />,
      },
      {
        path: clinicVetsRoute,
        element: <ClinicVetsPage />,
      },
      {
        path: petsRoute,
        element: <PetListPage />,
      },
      {
        path: petDetailRoute,
        element: <PetDetailPage />,
      },
    ],
  },
]);

export default router;
