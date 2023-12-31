import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {ROUTES} from '@/routes/constants';
import {useAuth} from '@/services/auth';

export const ProtectedRoute = () => {
  const {isAuthenticated} = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} state={{from: location}} replace />;
  }
  return <Outlet />;
};
