import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../Context';
import styles from './NavBar.module.css';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  const renderNavLink = (to, label, onClick) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.linkActive}` : styles.link
      }
      onClick={onClick}
    >
      {label}
    </NavLink>
  );

  return (
    <div className={styles.header}>
      {renderNavLink('/home', 'Home')}
      {renderNavLink('/notes', 'Notes')}
      {isAuthenticated && renderNavLink('/', 'Log out', logout)}
    </div>
  );
};

export default NavBar;
