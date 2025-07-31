import { useAuthStore } from '@/store/use-auth-store';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';

const Header = () => {
  const { user } = useAuthStore();

  return (
    <div className='sticky top-0 z-10 flex items-center h-16 bg-background border-b border-border px-4'>
      <div className='flex items-center gap-4 ml-auto'>
        <Button
          variant={'ghost'}
          size={'icon'}
          className='rounded-full border border-border'
        >
          <Bell size={18} />
        </Button>

        <div className='hidden md:block text-right'>
          <p className='text-sm font-medium'>{user?.name}</p>
          <p className='text-xs text-muted-foreground capitalize'>
            {user?.role}
          </p>
        </div>

        <div className='h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold overflow-hidden border border-border'>
          {user?.avatar ? (
            <img className='h-full w-full object-cover' src={user?.avatar} />
          ) : (
            user?.name?.charAt(0).toLowerCase()
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
