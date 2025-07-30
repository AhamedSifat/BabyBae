import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'deliveryman';
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
      login: async (credentials) => {},
      register: async (userData) => {},
      checkIsAdmin: () => {
        return false;
      },
      logout: () => {},
    }),
    {
      name: 'auth-storage',
    }
  )
);
