import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/shared/Footer/Footer';
import Navbar from '../pages/shared/NavBar/Navbar';

const MainLayout = () => {
  const location = useLocation();
  const navAndFooterPresent = location.pathname.includes('login' || 'register');

  console.log(navAndFooterPresent)
  return (
    <div>
      {navAndFooterPresent || (
        <header>
          <Navbar />
        </header>
      )}
      <main>
        <Outlet />
      </main>
      {navAndFooterPresent || <Footer />}
    </div>
  );
};

export default MainLayout;
