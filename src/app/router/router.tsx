import ProfilePage from '@/pages/ProfilePage/ui/ProfilePage';
import { createBrowserRouter } from 'react-router';
import { medicsRoute, patientsRoute, profileRoute, rootRoute } from './lib/constants';
import Root from './root';
import { ClipboardPlus, Dog, Home } from 'lucide-react';

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
    ],
  },
]);

export default router;
