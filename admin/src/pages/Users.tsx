import { useEffect, useState, useCallback } from 'react';
import { Search, Users, RefreshCw, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAxiosPrivate } from '@/hooks/use-axios-private';
import UserMangmentSkeletons from '@/Skeletons/users-managments-skeletons';

interface UserType {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'deliveryman';
  createdAt: string;
}

const UsersManagement = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get('/users');
      setUsers(response?.data);
    } catch (error) {
      console.error('Failed to load users', error);
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className='min-h-screen bg-gray-50/50 p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Users Management
            </h1>
            <p className='text-sm text-gray-500 mt-1'>
              View and manage all system users
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <Users className='w-5 h-5' />
              <span className='text-blue-600 font-bold'>{users.length}</span>
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={fetchUsers}
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`}
              />
              Refresh
            </Button>
            <Button size='sm'>Add User</Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className='flex items-center gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input placeholder='Search users...' className='pl-9' />
          </div>
          <Select>
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder='All Roles' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='admin'>Admin</SelectItem>
              <SelectItem value='user'>User</SelectItem>
              <SelectItem value='deliveryman'>Deliveryman</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
        <div className='bg-white rounded-lg border'>
          {loading ? (
            <UserMangmentSkeletons />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-16'>Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className='w-8 h-8 rounded-full object-cover'
                      />
                    </TableCell>
                    <TableCell className='font-medium'>{user.name}</TableCell>
                    <TableCell className='text-gray-600'>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === 'admin' ? 'destructive' : 'secondary'
                        }
                        className={
                          user.role === 'admin'
                            ? 'bg-red-100 text-red-700 hover:bg-red-100'
                            : 'bg-green-100 text-green-700 hover:bg-green-100'
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-gray-600'>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center justify-end gap-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                        >
                          <Edit className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0 text-red-600 hover:text-red-700'
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {users.length === 0 && !loading && (
            <div className='p-12 text-center'>
              <Users className='w-12 h-12 text-gray-300 mx-auto mb-4' />
              <p className='text-gray-500 text-lg mb-2'>No users found</p>
              <p className='text-gray-400'>
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
