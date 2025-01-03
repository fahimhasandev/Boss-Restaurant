import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='flex'>
      {/* Sidebar */}
      <div className='w-64 min-h-screen bg-orange-400 border border-green-400'>
        <ul className='menu'>
          <li>
            <NavLink to={'/dashboard/cart'}>My Cart</NavLink>
          </li>
        </ul>
      </div>
      {/* Dashboard content */}
      <div className='flex-1 w-full border h-full'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
