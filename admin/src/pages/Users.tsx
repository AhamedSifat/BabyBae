import { useEffect, useState, useCallback } from 'react';
import {
  Search,
  Users,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  Loader2,
} from 'lucide-react';
import { AxiosError } from 'axios';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type userFormData } from '@/lib/validation';
import { ImageUpload } from '@/components/image-upload';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const axiosPrivate = useAxiosPrivate();

  const formAdd = useForm<userFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'user',
      avatar: '',
    },
  });

  const handleAddUser = async (data: userFormData) => {
    setFormLoading(true);
    try {
      await axiosPrivate.post('/users', data);
      toast.success('User Created successfully');
      formAdd.reset();
      setIsAddModalOpen(false);
      fetchUsers();
    } catch (error: unknown) {
      console.log('Failed to create user', error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError?.response?.data?.message || 'Failed to create user'
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = (user: UserType) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await axiosPrivate.delete(`/users/${selectedUser?._id}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete users', error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError?.response?.data?.message || 'Failed to delete users'
      );
    }
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get('/users');
      setUsers(response?.data);
    } catch (error: unknown) {
      console.error('Failed to load users', error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError?.response?.data?.message || 'Failed to load users'
      );
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
            <Button
              onClick={() => setIsAddModalOpen(true)}
              size='sm'
              className='bg-blue-600 hover:bg-blue-700'
            >
              <Plus />
              Add User
            </Button>
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
                          onClick={() => handleDelete(user)}
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

      {/* Add User Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className='sm:max-w-[550px] max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>Create a new user account</DialogDescription>
          </DialogHeader>
          <Form {...formAdd}>
            <form
              className='mt-4 space-y-6'
              onSubmit={formAdd.handleSubmit(handleAddUser)}
            >
              {/* Name Field */}
              <FormField
                control={formAdd.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        {...field}
                        disabled={formLoading}
                        className='focus:border-indigo-500 hoverEffect'
                        placeholder='Enter name'
                      />
                    </FormControl>
                    <FormMessage className='text-red-500 text-xs' />
                  </FormItem>
                )}
              />
              {/* Email Field */}
              <FormField
                control={formAdd.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        {...field}
                        disabled={formLoading}
                        className='focus:border-indigo-500 hoverEffect'
                      />
                    </FormControl>
                    <FormMessage className='text-red-500 text-xs' />
                  </FormItem>
                )}
              />
              {/* Password Field */}
              <FormField
                control={formAdd.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        {...field}
                        disabled={formLoading}
                        className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200'
                      />
                    </FormControl>
                    <FormMessage className='text-red-500 text-xs' />
                  </FormItem>
                )}
              />
              {/* Role Field */}
              <FormField
                control={formAdd.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={formLoading}
                    >
                      <FormControl>
                        <SelectTrigger className='border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200'>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='user'>User</SelectItem>
                        <SelectItem value='admin'>Admin</SelectItem>
                        <SelectItem value='deliveryman'>
                          Delivery Person
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-red-500 text-xs' />
                  </FormItem>
                )}
              />
              {/* Avatar Field */}
              <FormField
                control={formAdd.control}
                name='avatar'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Avatar
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        disabled={formLoading}
                      />
                    </FormControl>
                    <FormMessage className='text-red-500 text-xs' />
                  </FormItem>
                )}
              />
              {/* Buttons */}
              <DialogFooter>
                <Button
                  type='button'
                  variant={'outline'}
                  onClick={() => {
                    setIsAddModalOpen(false);
                    formAdd.reset();
                  }}
                  disabled={formLoading}
                  className='border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg hoverEffect'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={formLoading}
                  className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200'
                >
                  {formLoading ? (
                    <>
                      <Loader2 className='animate-spin' /> Creating
                    </>
                  ) : (
                    'Create User'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              <span className='font-semibold'>{selectedUser?.name}</span>'s
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className='bg-red-600 hover:bg-red-700'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersManagement;
