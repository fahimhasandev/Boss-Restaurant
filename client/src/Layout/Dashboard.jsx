import { NavLink, Outlet } from 'react-router-dom';
import {
  FaAd,
  FaCalendar,
  FaHome,
  FaList,
  FaShoppingCart,
  FaSearch,
  FaEnvelope,
  FaUtensils,
  FaUser,
  FaBook,
} from 'react-icons/fa';
import useCart from '../hooks/useCart';

const Dashboard = () => {
  const [cart] = useCart();

  //TODO: get isAdmin value from the database
  const isAdmin = true;

  return (
    <div className='flex'>
      {/* Sidebar */}
      <div className='w-64 min-h-screen bg-orange-400'>
        <ul className='menu p-4'>
          {isAdmin ? (
            <>
              <li>
                <NavLink to='/dashboard/adminHome'>
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/addItems'>
                  <FaUtensils />
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/manageItems'>
                  <FaList />
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/bookings'>
                  <FaBook />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/users'>
                  <FaUser />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to='/dashboard/userHome'>
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/reservation'>
                  <FaCalendar></FaCalendar>
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/cart'>
                  <FaShoppingCart></FaShoppingCart>
                  My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/review'>
                  <FaAd></FaAd>
                  Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/bookings'>
                  <FaList></FaList>
                  My Bookings
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav links */}
          <div className='divider'></div>
          <li>
            <NavLink to='/'>
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/order/salad'>
              <FaSearch></FaSearch>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to='/order/contact'>
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
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
