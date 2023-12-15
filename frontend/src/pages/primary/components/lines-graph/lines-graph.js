import RcGantt, {enUS} from '@/ui-kit/graph';
import styles from './lines-graph.module.scss';

const DEFAULT_DATA = [
  {
    name: '',
    startDate: '1970-01-01',
    endDate: '1970-01-01',
  },
];

export const LinesGraph = ({lines}) => {
  const data = !lines || lines?.length === 0 ? DEFAULT_DATA : lines;
  return (
    <div className={styles.wrapper}>
      <RcGantt
        data={data}
        locale={enUS}
        unit="week"
        disabled={true}
        columns={[
          {
            name: 'name',
            label: 'Line Name',
            width: 100,
            maxWidth: 200,
            paddingLeft: 20,
          },
        ]}
      />
    </div>
  );
};
