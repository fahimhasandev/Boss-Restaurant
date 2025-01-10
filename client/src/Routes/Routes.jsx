import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home/Home/Home';
import Menu from '../pages/Menu/Menu/Menu';
import Order from '../pages/Order/Order/Order';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../Layout/Dashboard';
import PrivateRoutes from './PrivateRoutes';
import Cart from '../pages/Dashboard/Cart/Cart';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import AddItems from '../pages/Dashboard/AddItems/AddItems';
import AdminRoute from './AdminRoute';
import MangeItems from '../pages/ManageItems/MangeItems';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/order/:category',
        element: <Order />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      //normal user routes
      {
        path: 'cart',
        element: <Cart />,
      },

      //admin user routes
      {
        path: 'addItems',
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: 'manageItems',
        element: (
          <AdminRoute>
            <MangeItems />
          </AdminRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default Routes;
