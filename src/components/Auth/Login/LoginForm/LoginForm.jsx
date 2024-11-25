import React, { useState } from 'react';
import TextInput from '../TextInput';
import { NavLink } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(identifier, password);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.linksContainer}>
        <NavLink to="/" className={styles.link}>
          Back to Home
        </NavLink>
        <NavLink to="/registration" className={styles.link}>
          Back to Registration
        </NavLink>
      </div>
      <h2 className={styles.formTitle}>Log In</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <TextInput
            label="Username or Email"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="largeInput"
          />
        </div>
        <div className={styles.inputGroup}>
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="largeInput"
          />
        </div>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
