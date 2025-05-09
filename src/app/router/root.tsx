import { Outlet } from 'react-router';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/shared/ui/appsidebar';
import { useEffect, useMemo } from 'react';
import {
  appointmentsRoute,
  clinicVetsRoute,
  loginRoute,
  petsRoute,
  profileRoute,
  rootRoute,
  vetsRoute,
} from './lib/constants';
import { useNavigate } from 'react-router';
import PageLoader from '@/widgets/PageLoader/ui/PageLoader';
import useUserStore, { setUser } from '@/entities/User/model/user.store';
import userApi from '@/entities/User/api/user.api';
import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';
import { delay } from '@/shared/lib/utils/delay.utils';
import useAuthStore, { setIsShowLoader } from '@/entities/Auth/model/auth.store';
import { Toaster } from 'sonner';
import authToken from '@/shared/localstorage/authToken';
import { Dog, Stethoscope } from 'lucide-react';
import { ClipboardPlus, Hospital } from 'lucide-react';
import { Home } from 'lucide-react';
import AuthProvider from '../providers/AuthProvider';
import { allClinicsRoute } from './lib/constants';
const Root = () => {
  const navigate = useNavigate();
  const isShowLoader = useAuthStore((state) => state.isShowLoader);
  const isUser = useUserStore((state) => !!state.user);
  const isClinic = useUserStore((state) => !!(state.user as IClinic)?.name);

  const rootItems = useMemo(
    () => [
      {
        title: 'Profile',
        url: profileRoute,
        icon: Home,
      },
      
            {
              title: 'Pets',
              url: petsRoute,
              icon: Stethoscope,
            },
            {
              title: 'Appointments',
              url: appointmentsRoute,
              icon: Dog,
            },
            {
              title: 'All Vets',
              url: vetsRoute,
              icon: ClipboardPlus,
            },
            {
              title: 'All Clinics',
              url: allClinicsRoute,
              icon: Hospital,
            },
            {
              title: 'Clinic Vets',
              url: clinicVetsRoute,
              icon: Hospital,
            },
    ],
    [isClinic],
  );

  // TODO: пересмотреть авторизацию

  useEffect(() => {
    const token = authToken.get();
    if (!token) {
      navigate(loginRoute);
      delay(1000).then(() => {
        setIsShowLoader(false);
      });
    } else {
      userApi
        .getUser()
        .then((user) => {
          delay(300)
            .then(() => {
              navigate(rootRoute);
              setUser<IClinic | IVet | null>(user);
            })
            .then(() => {
              delay(400).then(() => {
                setIsShowLoader(false);
              });
            });
        })
        .catch(() => {
          setIsShowLoader(false);
          navigate(loginRoute);
        });
    }
  }, []);
  return (
    <AuthProvider>
      <Toaster />
      {<PageLoader isShow={isShowLoader} />}

      <SidebarProvider>
        {!isShowLoader && isUser ? (
          <>
            <AppSidebar items={rootItems} />
            <main className="flex-1 p-4 h-dvh w-dvw">
              <div className="br-8 rounded-lg border-gray-200 h-full w-full border p-4">
                <Outlet />
              </div>
            </main>
          </>
        ) : (
          <>
            {' '}
            <Outlet />
          </>
        )}
      </SidebarProvider>
    </AuthProvider>
  );
};

export default Root;
