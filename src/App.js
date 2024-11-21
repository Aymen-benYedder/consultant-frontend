import React, { Suspense, lazy, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { AppProvider, AppContext } from './AppContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const HomePage = lazy(() => import('./pages/HomePage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function App() {
  const { user, login } = useContext(AppContext);

  useEffect(() => {
    if (!user) {
      const initializeGoogleOneTap = () => {
        if (!window.google) return;
        
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            const userData = jwtDecode(response.credential);
            login(userData);
          },
          auto_select: true,
          cancel_on_tap_outside: false
        });

        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('One Tap not displayed:', notification.getNotDisplayedReason());
          }
        });
      };

      // Load Google One Tap script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = initializeGoogleOneTap;
      document.body.appendChild(script);

      return () => {
        const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
        if (window.google?.accounts?.id) {
          window.google.accounts.id.cancel();
        }
      };
    }
  }, [user, login]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }
    }
  );

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppProvider>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
      </AppProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
