import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {ROUTES} from '@/routes/constants';
import {useAuthContext} from '@/services/auth';

export const SecurePage = () => {
  const {user, loading} = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate(ROUTES.SIGN_IN);
    }
  }, [loading, navigate, user]);

  return <Outlet />;
};
