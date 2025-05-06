import { Outlet } from 'react-router';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/shared/ui/appsidebar';
import { useEffect, useMemo } from 'react';
import { loginRoute, medicsRoute, patientsRoute, profileRoute, rootRoute } from './lib/constants';
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
import { Dog } from 'lucide-react';
import { ClipboardPlus } from 'lucide-react';
import { Home } from 'lucide-react';
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
      ...(!isClinic
        ? []
        : [
            {
              title: 'Medics',
              url: medicsRoute,
              icon: ClipboardPlus,
            },
          ]),

      {
        title: 'Patients',
        url: patientsRoute,
        icon: Dog,
      },
    ],
    [isClinic],
  );

  useEffect(() => {
    const token = authToken.get();
    if (!token) {
      navigate(loginRoute);
      delay(1000).then(() => {
        setIsShowLoader(false);
      });
    } else {
      navigate(rootRoute);
      userApi
        .getUser()
        .then((user) => {
          setUser<IClinic | IVet | null>(user);
          delay(100).then(() => {
            setIsShowLoader(false);
          });
        })
        .catch(() => {
          setIsShowLoader(false);
          navigate(loginRoute);
        });
    }
  }, []);
  console.log(isShowLoader);
  return (
    <>
      <Toaster />
      {<PageLoader isShow={isShowLoader} />}
      {!isShowLoader && (
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
      )}
    </>
  );
};

export default Root;
