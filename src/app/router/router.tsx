import { createBrowserRouter } from 'react-router';
import {
  appointmentsRoute,
  appointmentDetailRoute,
  loginRoute,
  registerRoute,
  rootRoute,
  vetsRoute,
  petsRoute,
  petDetailRoute,
  allClinicsRoute,
  clinicDetailRoute,
  vetDetailRoute,
  addClinicRoute,
} from './lib/constants';
import VetsPage from '@/pages/VetsPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import Root from './root';
import AppointmentsPage from '@/pages/AppointmentsPage/ui/AppoitmentsPage';
import AppointmentDetailPage from '@/pages/AppointmentDetailPage';
import PetListPage from '@/pages/PetListPage/ui/PetListPage';
import PetDetailPage from '@/pages/PetDetailPage/ui/PetDetailPage';
import AllClinicsPage from '@/pages/AllClinicsPage/ui/AllClinicsPage';
import ClinicDetailPage from '@/pages/ClinicDetailPage/ui/ClinicDetailPage';
import VetDetailPage from '@/pages/VetDetailPage/ui/VetDetailPage';
import AddClinicPage from '@/pages/AddClinicPage/ui/AddClinicPage';
const router = createBrowserRouter([
  {
    path: rootRoute,
    element: <Root />,
    children: [
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
        path: appointmentDetailRoute,
        element: <AppointmentDetailPage />,
      },

      {
        path: allClinicsRoute,
        element: <AllClinicsPage />,
      },
      {
        path: clinicDetailRoute,
        element: <ClinicDetailPage />,
      },
      {
        path: petsRoute,
        element: <PetListPage />,
      },
      {
        path: petDetailRoute,
        element: <PetDetailPage />,
      },
      {
        path: vetDetailRoute,
        element: <VetDetailPage />,
      },
      {
        path: addClinicRoute,
        element: <AddClinicPage />,
      },
    ],
  },
]);

export default router;
