import {useCallback} from 'react';
import {useAuthErrors} from '@/services/auth';
import {logger} from '@/utils/logger';
import {get, post} from '../rest';

export const useFetchUser = () => {
  const {checkAuthError} = useAuthErrors();

  const fetchUser = useCallback(async () => {
    try {
      const response = await get('get-user');
      return response.data;
    } catch (e) {
      checkAuthError(e.response.status);
      logger.error(e);
      throw Error(e.response.data.error);
    }
  }, [checkAuthError]);

  const registrationUser = useCallback(async (data) => {
    try {
      const response = await post('registration', data);
      return response.data;
    } catch (e) {
      logger.error(e);
      throw Error(e.response.data.error);
    }
  }, []);

  const getUserToken = useCallback(async ({email, password}) => {
    try {
      const {data} = await post('token', {email, password});
      return data;
    } catch (e) {
      logger.error(e);
      throw Error(e.response.data.error);
    }
  }, []);

  const logoutUser = useCallback(async () => {
    try {
      await get('logout');
    } catch (e) {
      logger.error(e);
      throw Error(e.response.data.error);
    }
  }, []);

  return {fetchUser, registrationUser, getUserToken, logoutUser};
};
