import { Outlet } from 'react-router';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/shared/ui/appsidebar';
import { appSidebarItems } from './router';
import { useEffect } from 'react';
import { loginRoute, rootRoute } from './lib/constants';
import { useNavigate } from 'react-router';
import PageLoader from '@/widgets/PageLoader/ui/PageLoader';
import useUserStore, { setUser } from '@/entities/User/model/user.store';
import userApi from '@/entities/User/api/user.api';
import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';
import { delay } from '@/shared/lib/utils/delay.utils';
import useAuthStore, { setIsShowLoader } from '@/entities/Auth/model/auth.store';
import { Toaster } from 'sonner';
const Root = () => {
  const navigate = useNavigate();
  const isShowLoader = useAuthStore((state) => state.isShowLoader);
  const userEmail = useUserStore((state) => state.user?.email);
  useEffect(() => {
    console.log('here 0');
    const token = localStorage.getItem('token');
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
          setUser(user as IClinic | IVet | null);
          delay(100).then(() => {
            console.log('here 1');
            setIsShowLoader(false);
          });
        })
        .catch(() => {
          console.log('here 2');

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
          {!isShowLoader && userEmail ? (
            <>
              <AppSidebar items={appSidebarItems} />

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
