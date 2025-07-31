import { useAuthStore } from '@/store/use-auth-store';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const { user } = useAuthStore();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className='sticky top-0 z-10 flex items-center h-16 bg-background border-b border-border px-6 shadow-sm'
    >
      <div className='flex items-center ml-auto gap-6'>
        <motion.button
          type='button'
          aria-label='Notifications'
          className='rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent p-2 flex items-center justify-center'
          whileHover={{ scale: 1.15, rotate: 10, backgroundColor: '#f0f0f0' }}
          whileTap={{ scale: 0.95, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Bell size={20} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='hidden md:flex flex-col items-end space-y-0.5'
        >
          <p className='text-sm font-semibold text-foreground'>{user?.name}</p>
          <p className='text-xs text-muted-foreground capitalize'>
            {user?.role}
          </p>
        </motion.div>

        <motion.div
          title={user?.name ?? 'User Avatar'}
          className='h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden border border-border cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary'
          whileHover={{
            scale: 1.1,
            rotate: 5,
            boxShadow: '0 0 8px rgb(79 70 229)',
          }}
          whileTap={{ scale: 0.95, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {user?.avatar ? (
            <motion.img
              src={user.avatar}
              alt={`${user.name} avatar`}
              className='h-full w-full object-cover'
              loading='lazy'
              initial={{ scale: 0.95 }}
              whileHover={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          ) : (
            user?.name?.charAt(0).toUpperCase() ?? '?'
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
