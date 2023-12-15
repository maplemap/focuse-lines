import {useEffect} from 'react';
import {LinesGraph} from '@/pages/primary/components/lines-graph';
import {useLines} from '@/pages/primary/components/lines-list/use-lines';
import {Typography} from '@/ui-kit';
import {logger} from '@/utils/logger';
import {AddLine, LinesList} from './components';
import styles from './primary.module.scss';

export const PrimaryPage = () => {
  const {lines, getLines} = useLines();

  useEffect(() => {
    getLines().catch(logger.error);
  }, [getLines]);

  return (
    <>
      <div className={styles.linesGraph}>
        <Typography.Title level={2} className={styles.header}>
          Graph
        </Typography.Title>
        <LinesGraph lines={lines} />
      </div>
      <div className={styles.addLine}>
        <Typography.Title level={2} className={styles.header}>
          Add
        </Typography.Title>
        <AddLine />
      </div>
      <div className={styles.linesList}>
        <Typography.Title level={2} className={styles.header}>
          List
        </Typography.Title>
        <LinesList lines={lines} />
      </div>
    </>
  );
};
