interface AdminApiConfig {
  baseURL: string;
  isProduction: boolean;
}

export const getAdminApiConfig = (): AdminApiConfig => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error('VITE_API_URL environment variable is not defined');
  }

  const isProduction = import.meta.env.VITE_APP_ENV === 'production';

  return {
    baseURL: `${apiUrl}/api`,
    isProduction,
  };
};

export const ADMIN_API_ENDPOINTS = {
  REGISTER: 'auth/register',
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
} as const;
