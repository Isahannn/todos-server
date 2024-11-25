import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import { useAuth } from '../../Context';
import PATH_URL from './Path';

export default function Layout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const excludedRoutes = PATH_URL;

  const shouldShowNavBar =
    isAuthenticated && !excludedRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavBar && <NavBar />}
      <Outlet />
      <Footer />
    </div>
  );
}
