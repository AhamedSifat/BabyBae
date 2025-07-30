// store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import adminApi from '@/lib/api';

type Address = {
  street: string;
  city: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
};

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'deliveryman';
  addresses?: Address[] | [];
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => Promise<void>;
  checkIsAdmin: () => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        try {
          const response = await adminApi.post('/auth/login', credentials);
          const { token, ...userData } = response.data;

          set({
            user: userData,
            token,
            isAuthenticated: true,
          });

          toast.success(`Welcome back, ${userData.name}`);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast.error(error.response?.data?.message || 'Login failed');
        }
      },

      register: async (userData) => {
        try {
          await adminApi.post('/auth/register', userData);
          toast.success('Registration successful. You can now log in.');

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast.error(error.response?.data?.message || 'Registration failed');
        }
      },

      checkIsAdmin: () => {},

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('auth-storage');
        toast.success('Logged out successfully');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
