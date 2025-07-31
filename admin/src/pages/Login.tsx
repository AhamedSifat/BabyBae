import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import { loginSchema, type LoginFormData } from '@/lib/validation';
import { useAuthStore } from '@/store/use-auth-store';
import { useNavigate } from 'react-router';

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6a11cb] via-[#4361ee] to-[#3a86ff] p-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden'
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: 'spring',
          stiffness: 100,
        }}
      >
        {/* Decorative elements */}
        <div className='absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-r from-[#ff006e] to-[#ffbe0b] opacity-20'></div>
        <div className='absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-r from-[#8338ec] to-[#3a86ff] opacity-20'></div>

        {/* Floating shapes */}
        <motion.div
          className='absolute top-10 left-10 w-8 h-8 rounded-full bg-[#ff006e] opacity-30'
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className='absolute bottom-16 right-12 w-6 h-6 rounded-full bg-[#3a86ff] opacity-30'
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className='absolute top-1/3 right-16 w-10 h-10 rounded-full bg-[#ffbe0b] opacity-30'
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Logo and branding */}
        <motion.div
          className='flex flex-col items-center mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className='w-16 h-16 bg-gradient-to-r from-[#4361ee] to-[#3a86ff] rounded-xl flex items-center justify-center mb-3 shadow-lg'
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.03-.693-.083-1.024A5 5 0 0010 11z'
                clipRule='evenodd'
              />
            </svg>
          </motion.div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-[#4361ee] to-[#3a86ff] bg-clip-text text-transparent'>
            Admin Portal
          </h1>
          <p className='text-gray-500 mt-1'>Sign in to your account</p>
        </motion.div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 relative z-10'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 font-medium flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-[#4361ee] mr-2'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                    </svg>
                    Email
                  </FormLabel>
                  <motion.div whileFocus={{ scale: 1.01 }} className='relative'>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='admin@example.com'
                        className='pl-12 py-5 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#4361ee] focus:border-transparent'
                        {...field}
                      />
                    </FormControl>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-gray-400'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                        <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                      </svg>
                    </div>
                  </motion.div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex justify-between items-center'>
                    <FormLabel className='text-gray-700 font-medium flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-[#4361ee] mr-2'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Password
                    </FormLabel>
                    <a
                      href='#'
                      className='text-sm text-[#4361ee] hover:text-[#3a86ff] transition-colors'
                    >
                      Forgot password?
                    </a>
                  </div>
                  <motion.div whileFocus={{ scale: 1.01 }} className='relative'>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='********'
                        className='pl-12 py-5 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#4361ee] focus:border-transparent'
                        {...field}
                      />
                    </FormControl>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-gray-400'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </motion.div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='pt-4'
            >
              <Button
                type='submit'
                className='w-full py-6 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#3a86ff] hover:from-[#3a56e0] hover:to-[#2a75ff] shadow-lg hover:shadow-xl transition-all duration-300 text-white'
                disabled={loading}
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  <>
                    <LogIn />
                    <span className='text-lg font-semibold'>Login</span>
                  </>
                )}
              </Button>
            </motion.div>

            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                Don't have an account?{' '}
                <a
                  href='#'
                  className='font-medium text-[#4361ee] hover:text-[#3a86ff] transition-colors'
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </Form>

        {/* Security badge */}
        <motion.div
          className='mt-8 pt-6 border-t border-gray-200 flex items-center justify-center text-gray-500 text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-green-500 mr-2'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
          Secure login with 256-bit encryption
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
