import { Outlet } from 'react-router';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/shared/ui/appsidebar';
import { appSidebarItems } from './router';
const Root = () => {
  return (
    // <div>
    //   1
    //   <Outlet />
    // </div>
    <SidebarProvider>
      <AppSidebar items={appSidebarItems} />
      <main className="flex-1 p-4 h-dvh w-dvw">
        <div className="br-8 rounded-lg border-gray-200 h-full w-full border p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Root;
