import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/shared/Footer/Footer';
import NavMenu from '../pages/shared/NavBar/NavMenu';

const MainLayout = () => {
  const location = useLocation();
  const navAndFooterPresent =
    location.pathname.includes('login') ||
    location.pathname.includes('register');

  console.log(navAndFooterPresent);
  return (
    <div>
      {navAndFooterPresent || <NavMenu />}
      <main>
        <Outlet />
      </main>
      {navAndFooterPresent || <Footer />}
    </div>
  );
};

export default MainLayout;
