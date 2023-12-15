import {useCallback, useState} from 'react';
import {useAuthErrors} from '@/services/auth';
import {logger} from '@/utils/logger';
import {get} from '../rest';

export const useFetchLines = () => {
  const [loading, setLoading] = useState(false);
  const {checkAuthError} = useAuthErrors();

  const fetchLines = useCallback(async () => {
    try {
      setLoading(true);

      const response = await get('lines');
      return response.data;
    } catch (e) {
      checkAuthError(e.response.status);
      logger.error(e);
      throw Error(e.response.data.error);
    } finally {
      setLoading(false);
    }
  }, [checkAuthError]);

  return {fetchLines, loading};
};
