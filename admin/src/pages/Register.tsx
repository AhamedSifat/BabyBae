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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'lucide-react';
import { registerSchema, type RegisterFormData } from '@/lib/validation';
import { useAuthStore } from '@/store/use-auth-store';
import { useNavigate } from 'react-router';

export default function Register() {
  const { register } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      await register(data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8E2DE2] via-[#4A00E0] to-[#1a2a6c] p-4'
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
        <div className='absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] opacity-20'></div>
        <div className='absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-r from-[#1a2a6c] to-[#4A00E0] opacity-20'></div>

        {/* Floating shapes */}
        <motion.div
          className='absolute top-10 left-10 w-8 h-8 rounded-full bg-[#FF416C] opacity-30'
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className='absolute bottom-16 right-12 w-6 h-6 rounded-full bg-[#4A00E0] opacity-30'
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className='absolute top-1/3 right-16 w-10 h-10 rounded-full bg-[#FF4B2B] opacity-30'
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Success animation */}
        <div className='success-animation hidden absolute inset-0 bg-white bg-opacity-90 z-20 flex flex-col items-center justify-center rounded-2xl'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </motion.div>
          <motion.h2
            className='text-2xl font-bold text-gray-800'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Registration Successful!
          </motion.h2>
          <motion.p
            className='text-gray-600 mt-2'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your account has been created
          </motion.p>
        </div>

        {/* Logo and branding */}
        <motion.div
          className='flex flex-col items-center mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className='w-16 h-16 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] rounded-xl flex items-center justify-center mb-3 shadow-lg'
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
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                clipRule='evenodd'
              />
            </svg>
          </motion.div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent'>
            Create Account
          </h1>
          <p className='text-gray-500 mt-1'>Join our platform today</p>
        </motion.div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 relative z-10'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 font-medium flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-[#8E2DE2] mr-2'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Full Name
                  </FormLabel>
                  <motion.div whileFocus={{ scale: 1.01 }} className='relative'>
                    <FormControl>
                      <Input
                        placeholder='John Doe'
                        className='pl-12 py-5 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#8E2DE2] focus:border-transparent'
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
                          d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </motion.div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 font-medium flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-[#8E2DE2] mr-2'
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
                        placeholder='john@example.com'
                        className='pl-12 py-5 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#8E2DE2] focus:border-transparent'
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
                  <FormLabel className='text-gray-700 font-medium flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-[#8E2DE2] mr-2'
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
                  <motion.div whileFocus={{ scale: 1.01 }} className='relative'>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        className='pl-12 py-5 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#8E2DE2] focus:border-transparent'
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

            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 font-medium flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-[#8E2DE2] mr-2'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
                    </svg>
                    Role
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <SelectTrigger className='py-5 px-4 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#8E2DE2] focus:border-transparent'>
                          <SelectValue placeholder='Select your role' />
                        </SelectTrigger>
                      </motion.div>
                    </FormControl>
                    <SelectContent className='rounded-xl'>
                      <SelectItem
                        value='admin'
                        className='py-3 hover:bg-purple-50 cursor-pointer'
                      >
                        <div className='flex items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 text-purple-500 mr-2'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                              clipRule='evenodd'
                            />
                          </svg>
                          admin
                        </div>
                      </SelectItem>
                      <SelectItem
                        value='user'
                        className='py-3 hover:bg-purple-50 cursor-pointer'
                      >
                        <div className='flex items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 text-blue-500 mr-2'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                              clipRule='evenodd'
                            />
                          </svg>
                          user{' '}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='pt-2'
            >
              <Button
                type='submit'
                className='w-full py-6 rounded-xl bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:from-[#7d1cc9] hover:to-[#3a00c4] shadow-lg hover:shadow-xl transition-all duration-300 text-white'
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
                    Creating account...
                  </div>
                ) : (
                  <span className='text-lg font-semibold'>Create Account</span>
                )}
              </Button>
            </motion.div>

            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                Already have an account?{' '}
                <Link
                  to='/signin'
                  className='font-medium text-[#8E2DE2] hover:text-[#4A00E0] transition-colors'
                >
                  Sign in
                </Link>
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
          Secure registration with 256-bit encryption
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
