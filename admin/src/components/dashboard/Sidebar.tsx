import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import {
  ChevronLeft,
  LayoutDashboard,
  UserCheck,
  Users,
  ShoppingCart,
  FileText,
  Image,
  Package,
  Grid3X3,
  Award,
  User,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation, Link } from 'react-router';
import { useAuthStore } from '@/store/use-auth-store';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navigationItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard',
    badge: null,
  },
  { icon: UserCheck, label: 'Account', path: '/account' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: FileText, label: 'Invoices', path: '/invoices' },
  { icon: Image, label: 'Banners', path: '/banners' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Grid3X3, label: 'Categories', path: '/categories' },
  { icon: Award, label: 'Brands', path: '/brands' },
];

const Sidebar = ({ open, setOpen }: Props) => {
  const { user } = useAuthStore();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <motion.aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 flex flex-col border-r border-slate-700/50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl backdrop-blur-lg',
        '[&::-webkit-scrollbar]:hidden' // Hide scrollbar for webkit browsers
      )}
      animate={{ width: open ? 256 : 80 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        type: 'tween',
      }}
      style={{ width: open ? 256 : 80 }}
    >
      {/* Header */}
      <div className='flex items-center justify-between p-4 h-16 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden'>
        <div className='absolute inset-0 bg-black/20'></div>

        <AnimatePresence mode='wait'>
          {open && (
            <motion.div
              key='logo'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className='relative z-10'
            >
              <h2 className='font-bold text-xl text-white drop-shadow-lg whitespace-nowrap'>
                BabyBay Admin
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='relative z-10'
        >
          <Button
            onClick={toggleSidebar}
            variant='ghost'
            size='icon'
            className='rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all duration-200 border border-white/20 hover:border-white/30 backdrop-blur-sm'
          >
            <motion.div
              animate={{ rotate: open ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft size={18} />
            </motion.div>
          </Button>
        </motion.div>
      </div>

      <nav
        className='flex-1 py-4 overflow-y-auto'
        style={{
          scrollbarWidth: 'none' /* Firefox */,
          msOverflowStyle: 'none' /* Internet Explorer 10+ */,
        }}
      >
        <ul className='space-y-1 px-3'>
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link to={item.path}>
                  <motion.div
                    className={cn(
                      'relative flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer',
                      active
                        ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-white border border-emerald-500/30 shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    )}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setHoveredItem(item.path)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        layoutId='activeIndicator'
                        className='absolute left-0 w-1 h-8 bg-gradient-to-b from-emerald-400 to-blue-500 rounded-r'
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <Icon
                      size={20}
                      className={cn(
                        'flex-shrink-0 transition-colors duration-200',
                        active
                          ? 'text-emerald-400'
                          : 'text-slate-400 group-hover:text-white'
                      )}
                    />

                    <AnimatePresence mode='wait'>
                      {open && (
                        <motion.div
                          key={`label-${item.path}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.05 * index,
                            ease: 'easeOut',
                          }}
                          className='ml-3 flex items-center justify-between flex-1 overflow-hidden'
                        >
                          <span className='whitespace-nowrap'>
                            {item.label}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Tooltip for collapsed state */}
                    <AnimatePresence>
                      {!open && hoveredItem === item.path && (
                        <motion.div
                          initial={{ opacity: 0, x: -10, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -10, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className='absolute left-full ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-xl whitespace-nowrap z-50 border border-slate-700'
                        >
                          {item.label}

                          {/* Arrow pointer */}
                          <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 border-l border-b border-slate-700 rotate-45'></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info and Logout */}
      <div className='border-t border-slate-700/50 p-3'>
        {/* User Info */}
        <div className='p-4 border-b border-slate-700/50'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center flex-shrink-0'>
              <User size={20} className='text-white' />
            </div>

            <AnimatePresence mode='wait'>
              {open && (
                <motion.div
                  key='profile'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className='overflow-hidden'
                >
                  <p className='text-white font-medium text-sm whitespace-nowrap'>
                    {user?.name}
                  </p>
                  <p className='text-slate-400 text-xs whitespace-nowrap'>
                    {user?.role}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Logout */}
        <Link to='/logout'>
          <motion.div
            className='flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer text-slate-300 hover:text-red-400 hover:bg-red-500/10'
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setHoveredItem('/logout')}
            onHoverEnd={() => setHoveredItem(null)}
          >
            <LogOut
              size={20}
              className='flex-shrink-0 text-red-400 transition-colors duration-200 group-hover:text-red-300'
            />

            <AnimatePresence mode='wait'>
              {open && (
                <motion.span
                  key='logout'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className='ml-3 whitespace-nowrap'
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>

            {/* Tooltip for collapsed state */}
            <AnimatePresence>
              {!open && hoveredItem === '/logout' && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className='absolute left-full ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-xl whitespace-nowrap z-50 border border-slate-700'
                >
                  Logout
                  <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 border-l border-b border-slate-700 rotate-45'></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
