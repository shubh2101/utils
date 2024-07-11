/* eslint-disable react/prop-types */
import Cookies from 'js-cookie';

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { authVerifyOtp } from './services';
import { AUTH_COOKIE_NAME } from '../utils/name';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const formatUser = (user) => {
  return {
    authToken: {
      token: user?.accessToken || Cookies.get(AUTH_COOKIE_NAME),
      isActive: true,
    },
  };
};

export function useAuthProvider() {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const removeAuthUser = () => {
    Cookies.remove(AUTH_COOKIE_NAME, { path: '/' });
    setIsAuthenticated(false);
    setAuthUser(null);
  };

  const handleUser = useCallback(
    (rawUser) => {
      if (rawUser) {
        const user = formatUser(rawUser);

        setAuthUser(user);

        return user;
      } else {
        setAuthUser(null);

        return null;
      }
    },
    [setAuthUser]
  );

  const signInWithOtp = async (phoneNumber, otp) => {
    const response = await authVerifyOtp(phoneNumber, otp, 'business');
    const { data } = response;
    Cookies.set(AUTH_COOKIE_NAME, data.accessToken, { expires: 1, path: '/' });
    setIsAuthenticated(true);
    const user = handleUser(data);
    return user;
  };

  const signOut = () => {
    removeAuthUser();
  };

  useEffect(() => {
    const token = Cookies.get(AUTH_COOKIE_NAME);

    if (token) {
      setIsAuthenticated(true);
      const user = formatUser();
      setAuthUser(user);
    } else {
      setIsAuthenticated(false);
      setAuthUser(null);
    }
    setLoading(false);
  }, []);

  //values can be memoised also
  return {
    authUser,
    isAuthenticated,
    signInWithOtp,
    signOut,
    loading,
  };
}
