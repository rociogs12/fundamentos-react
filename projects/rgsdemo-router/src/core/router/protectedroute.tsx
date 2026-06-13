import { Navigate } from 'react-router';
import { useAuth } from '@features/auth/hooks/use-auth';

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { getUserFromStorage } = useAuth();
  const user = getUserFromStorage();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};