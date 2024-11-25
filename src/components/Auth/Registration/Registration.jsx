import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import API_URL from '../../../config';


const Registration = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async (values) => {
    setLoading(true);
    setError('');

    try {
      const jsonPayload = JSON.stringify(values);

      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonPayload,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Registration error: ${errorText}`);
      }

      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegistrationForm
      onSubmit={handleRegistration}
      loading={loading}
      error={error}
    />
  );
};

export default Registration;
