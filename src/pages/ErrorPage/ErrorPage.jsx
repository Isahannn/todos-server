import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context';

const ErrorPage = ({ errorMessage }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGoHome = () => {
    const redirectTo = isAuthenticated ? '/home' : '/';
    navigate(redirectTo);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="text-lg mt-4">{errorMessage || 'Sorry, an unexpected error has occurred.'}</p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
