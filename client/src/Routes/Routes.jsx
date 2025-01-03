import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home/Home/Home';
import Menu from '../pages/Menu/Menu/Menu';
import Order from '../pages/Order/Order/Order';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../Layout/Dashboard';
import Cart from '../pages/Dashboard/Cart';

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
    element: <Dashboard />,
    children: [
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
]);

export default Routes;
