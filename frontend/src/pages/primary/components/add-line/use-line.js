import {useCallback} from 'react';
import {useFetchLine} from '@/services/api';
import {logger} from '@/utils/logger';

export const useLine = () => {
  const {saveLine, deleteLine, editLine} = useFetchLine();

  const addLine = useCallback(
    async (data) => {
      await saveLine(data).catch(logger.error);
    },
    [saveLine],
  );

  const updateLine = useCallback(
    async (data) => {
      await editLine(data).catch(logger.error);
    },
    [editLine],
  );

  const removeLine = useCallback(
    async (id) => {
      await deleteLine(id).catch(logger.error);
    },
    [deleteLine],
  );

  return {addLine, removeLine, updateLine};
};
