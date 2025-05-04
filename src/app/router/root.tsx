import { Outlet } from 'react-router';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/shared/ui/appsidebar';
import { appSidebarItems } from './router';
import { useEffect, useState } from 'react';
import { loginRoute, rootRoute } from './lib/constants';
import { useNavigate } from 'react-router';
import PageLoader from '@/widgets/PageLoader/ui/PageLoader';
import useUserStore, { setUser } from '@/entities/User/model/user.store';
import userApi from '@/entities/User/api/user.api';
import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';
import { delay } from '@/shared/lib/utils/delay.utils';
const Root = () => {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    userApi.getUser().then((user) => {
      setUser(user as IClinic | IVet | null);
      delay(100).then(() => {
        setIsLoading(false);
      });
    });
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   navigate(loginRoute);
    // } else {
    //   navigate(rootRoute);
    // }
  }, []);
  return (
    <>
      {<PageLoader isShow={isLoading} />}
      {!isLoading && (
        <SidebarProvider>
          <AppSidebar items={appSidebarItems} />
          <main className="flex-1 p-4 h-dvh w-dvw">
            <div className="br-8 rounded-lg border-gray-200 h-full w-full border p-4">
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
      )}
    </>
  );
};

export default Root;
