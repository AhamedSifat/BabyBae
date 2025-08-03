import adminApi from '@/lib/api';
import { useAuthStore } from '@/store/use-auth-store';
import { useEffect } from 'react';

export const useAxiosPrivate = () => {
  const { logout } = useAuthStore();

  useEffect(() => {
    const responseIntercept = adminApi.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return () => {
      adminApi.interceptors.response.eject(responseIntercept);
    };
  }, [logout]);

  return adminApi;
};
