import {useCallback} from 'react';
import {useAuthErrors} from '@/services/auth';
import {useAppStore} from '@/services/store';
import {logger} from '@/utils/logger';
import {get, post, put, remove} from '../rest';

export const useFetchLine = () => {
  const {loading, setLoading} = useAppStore(false);
  const {checkAuthError} = useAuthErrors();

  const fetchLine = useCallback(
    async (id) => {
      setLoading(true);

      try {
        const response = await get('line', {id});
        return response.data;
      } catch (e) {
        checkAuthError(e.response.status);
        logger.error(e);
        throw Error(e.response.data.error);
      } finally {
        setLoading(false);
      }
    },
    [checkAuthError, setLoading],
  );

  const saveLine = useCallback(
    async ({name, startDate, endDate}) => {
      setLoading(true);

      try {
        const response = await post('line', {
          name,
          date_of_start: startDate,
          date_of_end: endDate,
        });
        return response.data;
      } catch (e) {
        checkAuthError(e.response.status);
        logger.error(e);
        throw Error(e.response.data.error);
      } finally {
        setLoading(false);
      }
    },
    [checkAuthError, setLoading],
  );

  const editLine = useCallback(
    async ({id, name, startDate, endDate}) => {
      setLoading(true);

      try {
        const response = await put('line', {
          id,
          name,
          date_of_start: startDate,
          date_of_end: endDate,
        });
        return response.data;
      } catch (e) {
        checkAuthError(e.response.status);
        logger.error(e);
        throw Error(e.response.data.error);
      } finally {
        setLoading(false);
      }
    },
    [checkAuthError, setLoading],
  );

  const deleteLine = useCallback(
    async ({id}) => {
      setLoading(true);

      try {
        const response = await remove('line', {
          id,
        });
        return response.data;
      } catch (e) {
        checkAuthError(e.response.status);
        logger.error(e);
        throw Error(e.response.data.error);
      } finally {
        setLoading(false);
      }
    },
    [checkAuthError, setLoading],
  );

  return {fetchLine, saveLine, editLine, deleteLine, loading};
};
