import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import { Toaster } from 'sonner';
import Dashboard from './pages/Dashboard.tsx';
import Users from './pages/Users.tsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register',
    element: <Register />,
  },

  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },

      {
        path: '/dashboard/users',
        element: <Users />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
