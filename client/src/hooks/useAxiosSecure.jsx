import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5002',
});

const useAxiosSecure = () => {
  // axiosSecure.interceptors.request.use(fn, error => Promise.reject(error));
  axiosSecure.interceptors.request.use(
    (config) => {
      //get the token from localStorage
      const token = localStorage.getItem('access-token');
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosSecure;
};

export default useAxiosSecure;
