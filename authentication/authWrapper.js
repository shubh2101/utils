import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import AuthLoading from './AuthLoading';

export default function AuthWrapper({ children }) {
  const auth = useAuth();
  const { isAuthenticated, loading } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <AuthLoading />; // Show loading state while checking authentication
  }

  return isAuthenticated ? children : <AuthLoading />;
}
