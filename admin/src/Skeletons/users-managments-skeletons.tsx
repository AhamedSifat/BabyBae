import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const UserMangmentSkeletons = () => {
  return (
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
        {Array.from({ length: 8 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className='w-8 h-8 rounded-full' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-32' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-48' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-6 w-16 rounded-full' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-20' />
            </TableCell>
            <TableCell>
              <div className='flex items-center justify-end gap-2'>
                <Skeleton className='h-8 w-8 rounded' />
                <Skeleton className='h-8 w-8 rounded' />
                <Skeleton className='h-8 w-8 rounded' />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserMangmentSkeletons;
