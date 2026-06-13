import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import type { UserLogin } from '../../types/user';
import { LoginForm } from '../login/login-form';
import { RegisterForm } from '../register/register-form';
import { Navigate } from 'react-router';

type UserState = 'loginPending' | 'registerPending' | 'logged';

export const UserManager = () => {
  const { getUserFromStorage } = useAuth();

  const [userState, setUserState] = useState<UserState>('loginPending');
  const [user, setUser] = useState<UserLogin | null>(null);

  const handleLogin = () => {
    const user = getUserFromStorage();
    setUser(user);
    setUserState('logged');
  };

  const handleSelectForm = (state: 'loginPending' | 'registerPending') => {
    setUserState(state);
  };

  useEffect(() => {
    const user = getUserFromStorage();

    if (user) {
      setUser(user);
      setUserState('logged');
    }
  }, [getUserFromStorage]);

  return (
    <>
      {userState === 'loginPending' && (
        <LoginForm
          onLogin={handleLogin}
          onSelectForm={handleSelectForm}
        />
      )}

      {userState === 'registerPending' && (
        <RegisterForm onSelectForm={handleSelectForm} />
      )}

      {userState === 'logged' && user && (
        <Navigate to="/movies" replace />
      )}
    </>
  );
};