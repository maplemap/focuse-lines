import {Typography} from '@/ui-kit';
import {LineItem} from '../line-item';
import styles from './lines-list.module.scss';

export const LinesList = ({lines}) => {
  return (
    <div className={styles.list}>
      {lines?.length > 0 ? (
        lines.map((line) => <LineItem key={line.id} data={line} />)
      ) : (
        <Typography.Text disabled={true} className={styles.noLines}>
          No lines found. Please create one
        </Typography.Text>
      )}
    </div>
  );
};
