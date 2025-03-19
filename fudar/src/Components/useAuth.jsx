import { useContext } from 'react';
import AuthContext from './AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    isAuthenticated: () => !!context.user,
    user: context.user,
    login: context.login,
    logout: context.logout
  };
};