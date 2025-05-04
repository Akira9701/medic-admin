import ProfilePage from '@/pages/ProfilePage/ui/ProfilePage';
import { createBrowserRouter } from 'react-router';
import {
  loginRoute,
  medicsRoute,
  patientsRoute,
  profileRoute,
  registerRoute,
  rootRoute,
} from './lib/constants';
import Root from './root';
import { ClipboardPlus, Dog, Home } from 'lucide-react';
import VetsPage from '@/pages/VetsPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';

export const appSidebarItems = [
  {
    title: 'Profile',
    url: profileRoute,
    icon: Home,
  },
  {
    title: 'Medics',
    url: medicsRoute,
    icon: ClipboardPlus,
  },
  {
    title: 'Patients',
    url: patientsRoute,
    icon: Dog,
  },
];

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
    ],
  },
]);

export default router;
