import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Welcome.module.css';

export default function Welcome() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>WELCOME TO NOTES</h1>
      <p className={styles.options}>Are you registered?</p>

      <div className={styles.authContainer}>
        <NavLink to="/login" className={`${styles.authButton} ${styles.loginButton}`}>
          Log in
        </NavLink>
        <span>|</span>
        <NavLink to="/registration" className={`${styles.authButton} ${styles.registerButton}`}>
          Register
        </NavLink>
      </div>
    </div>
  );
}
