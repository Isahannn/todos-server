import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useAuth } from '../../../Context';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';

const LogIn = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (identifier, password) => {
    setLoading(true);
    setError('');

    try {
      const queryParam = identifier.includes('@') ? `email=${identifier}` : `username=${identifier}`;
      const response = await fetch(`http://localhost:5001/users?${queryParam}`);

      if (!response.ok) {
        throw new Error('Login failed, please try again.');
      }

      const users = await response.json();
      const user = users.find((u) => bcrypt.compareSync(password, u.password));

      if (user) {
        console.log('User logged in:', user);
        login(user);
        navigate('/home');
      } else {
        setError('Invalid username/email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />;
};

export default LogIn;
