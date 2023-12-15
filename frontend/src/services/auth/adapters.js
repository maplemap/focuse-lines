import {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AUTHORIZATION_TOKEN_KEY, USER_DATA_KEY} from '@/constants';
import {ROUTES} from '@/routes/constants';
import {useFetchUser} from '@/services/api';
import {ERROR_STATUS} from '@/services/api/constants';
import {AuthContext} from '@/services/auth/provider';
import {localeStore} from '@/services/storage';
import {useAppStore} from '@/services/store';
import {logger} from '@/utils/logger';

export const useAuthContext = () => useContext(AuthContext);

export const useAuth = () => {
  const {setLoading: setGlobalLoading} = useAppStore();
  const {token, setToken, user, setUser} = useAuthContext();
  const {registrationUser, getUserToken, logoutUser, fetchUser} =
    useFetchUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setGlobalLoading(loading);
  }, [loading, setGlobalLoading]);

  const getUser = useCallback(async () => {
    const user = await fetchUser().catch(logger.error);
    setUser(user);
  }, [fetchUser, setUser]);

  const registration = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const {access_token} = await registrationUser(data);
        setToken(access_token);
        await getUser();
      } catch (e) {
        throw Error(e);
      } finally {
        setLoading(false);
      }
    },
    [getUser, registrationUser, setToken],
  );

  const login = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const {access_token} = await getUserToken(data);
        setToken(access_token);
        await getUser();
      } catch (e) {
        throw Error(e);
      } finally {
        setLoading(false);
      }
    },
    [getUser, getUserToken, setToken],
  );

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await logoutUser();
    } catch (e) {
      throw Error(e);
    } finally {
      setLoading(false);
      setToken(null);
      setUser(null);
    }
  }, [logoutUser, setToken, setUser]);

  return {
    loading,
    login,
    logout,
    registration,
    getUser,
    user,
    isAuthenticated: Boolean(token),
  };
};

export const useAuthErrors = () => {
  const navigate = useNavigate();

  const checkAuthError = useCallback(
    (statusCode) => {
      if (statusCode === ERROR_STATUS.UNAUTHORIZED) {
        localeStore.remove(AUTHORIZATION_TOKEN_KEY);
        localeStore.remove(USER_DATA_KEY);

        navigate(ROUTES.SIGN_IN);
      }
    },
    [navigate],
  );

  return {checkAuthError};
};
