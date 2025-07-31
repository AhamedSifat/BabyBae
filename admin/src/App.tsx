import { Navigate, Outlet } from 'react-router';
import Header from './components/common/Header';
import Sidebar from './components/dashboard/Sidebar';
import { cn } from './lib/utils';
import { useAuthStore } from './store/use-auth-store';
import { useState } from 'react';

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const [sideBarOpen, setSideBarOpen] = useState(true);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='h-screen flex bg-background'>
      <Sidebar open={sideBarOpen} setOpen={setSideBarOpen} />
      <div
        className={cn(
          'flex-1 flex flex-col max-w-[--breakpoint-2xl] hoverEffect ',
          sideBarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
