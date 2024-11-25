import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout/Layout';
import Welcome from './components/DefPages/Welcome/Welcome';
import LogIn from './components/Auth/Login/Login';
import Registration from './components/Auth/Registration/Registration';
import Home from './components/DefPages/Home/Home';
import NotesPage from './pages/NotesPage/NotesPage';
import NoteDetail from './pages/NoteDetail/NoteDetail';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './Context';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Welcome /> },
        { path: '/login', element: <LogIn /> },
        { path: '/registration', element: <Registration /> },
        {
          path: '/home',
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: '/notes',
          element: (
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/notes/:id',
          element: (
            <ProtectedRoute>
              <NoteDetail />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
