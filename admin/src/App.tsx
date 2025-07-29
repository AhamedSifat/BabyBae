import { Navigate, Outlet } from 'react-router';
import Header from './components/common/Header';
import Sidebar from './components/dashboard/Sidebar';
import { cn } from './lib/utils';

const App = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='h-screen flex bg-background'>
      <Sidebar />
      <div
        className={cn(
          'flex-1 flex flex-col max-w-[--breakpoint-2xl] hoverEffect ml-64'
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
