import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5002',
});

const useAxiosSecure = () => {
  //
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // axiosSecure.interceptors.request.use(fn, error => Promise.reject(error));
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    (config) => {
      //get the token from localStorage
      const token = localStorage.getItem('access-token');
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  //intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      //console.log('Status error in the interceptor', status);
      // for 401 or 403 logout theuser and move the user to the login
      if (status === 401 || status === 403) {
        await logOut;
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
