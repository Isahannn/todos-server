import React from 'react';
import { useAuth } from '../../../Context';
import styles from './Home.module.css';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <img src={user?.avatar} alt="User Avatar" className={styles.avatar} />
      <div className={styles.greeting}>Hello {user?.userName}</div>
      <div>Welcome to your personalized TODO list.</div>
      <div className={styles.email}>Your Email Address: {user?.email}</div>
      <div className={styles.registration}>
        Your Time Registration: {user?.createdAd}
        <div>
        <NavLink to="/notes">Go to Notes</NavLink>
       </div>
      </div>
    </div>
  );
}
