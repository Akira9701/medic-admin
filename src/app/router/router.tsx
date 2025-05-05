import ProfilePage from '@/pages/ProfilePage/ui/ProfilePage';
import { createBrowserRouter } from 'react-router';
import {
  appointmentsRoute,
  loginRoute,
  medicsRoute,
  profileRoute,
  registerRoute,
  rootRoute,
} from './lib/constants';
import VetsPage from '@/pages/VetsPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import Root from './root';
import AppointmentsPage from '@/pages/AppointmentsPage/ui/AppoitmentsPage';

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
        path: medicsRoute,
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
    ],
  },
]);

export default router;
