import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // tas stack query
  // custom name and defualt value --->  cart=[]. cart will be empty array [] before loading
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });
  return [cart, refetch];
};

export default useCart;
