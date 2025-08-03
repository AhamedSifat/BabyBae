import { useAxiosPrivate } from '@/hooks/use-axios-private';
import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get('/users');
      console.log('response', response);
      setUsers(response.data);
    } catch (error) {
      console.log('Failed to load users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <div>Users</div>;
};

export default Users;
