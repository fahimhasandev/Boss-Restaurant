import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:5002',
});

const useAxiosPublic = () => {
  return <div>useAxiosPublic</div>;
};

export default useAxiosPublic;
