import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import AuthService from '@/shared/lib/services/auth.service';
import { setIsShowLoader } from '../model/auth.store';
import { delay } from '@/shared/lib/utils/delay.utils';

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Component that protects routes requiring authentication
 * Redirects to login if user is not authenticated
 */
const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      setIsShowLoader(true);
      setIsChecking(true);

      try {
        // Check if user is authenticated and token is valid
        if (AuthService.isAuthenticated()) {
          // Try to refresh token if needed
          await AuthService.refreshTokenIfNeeded();
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        // Short delay to prevent UI flash
        await delay(300);
        setIsChecking(false);
        setIsShowLoader(false);
      }
    };

    checkAuth();
  }, []);

  // While checking authentication status, return nothing (or a loading spinner)
  if (isChecking) {
    return null;
  }

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the protected route
  return <>{children}</>;
};

export default AuthGuard;
