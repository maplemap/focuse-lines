import {useCallback} from 'react';
import {prepareLineData} from '@/pages/primary/utils';
import {useFetchLines} from '@/services/api/adapters/use-fetch-lines';
import {useAppStore} from '@/services/store';

export const useLines = () => {
  const {lines, setLines} = useAppStore();
  const {fetchLines, loading} = useFetchLines();

  const getLines = useCallback(async () => {
    const lines = await fetchLines();
    setLines(lines.map(prepareLineData).reverse());
  }, [fetchLines, setLines]);

  return {lines, getLines, loading};
};
