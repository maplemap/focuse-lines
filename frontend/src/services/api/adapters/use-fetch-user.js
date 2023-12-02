import {ERROR_STATUS} from '@/services/api/constants';
import {logger} from '@/utils/logger';
import {get, post} from '../rest';

export const useFetchUser = () => {
  const fetchUser = async () => {
    try {
      const response = await get('get-user');
      return response.data;
    } catch (e) {
      if (e.response.status === ERROR_STATUS.UNAUTHORIZED) {
        return null;
      }
    }
  };

  const registrationUser = async (data) => {
    try {
      const response = await post('registration', data);
      return response.data;
    } catch (e) {
      logger.error(e);
      throw Error(e.response.data.error);
    }
  };

  const getUserToken = async ({email, password}) => {
    try {
      const {data} = await post('token', {email, password});
      return data;
    } catch (e) {
      logger.error(e);
      throw Error(e.response.data.error);
    }
  };

  const logoutUser = async () => {
    try {
      await get('logout');
    } catch (e) {
      logger.error(e);
      throw Error(e.response.data.error);
    }
  };

  return {fetchUser, registrationUser, getUserToken, logoutUser};
};
