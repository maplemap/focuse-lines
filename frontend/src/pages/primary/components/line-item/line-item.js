import {useState} from 'react';
import {AddLineForm} from '@/pages/primary/components/add-line-form';
import {LineWrapper} from '@/pages/primary/components/line-wrapper/line-wrapper';
import {useLines} from '@/pages/primary/components/lines-list/use-lines';
import {Button, Popconfirm, Typography} from '@/ui-kit';
import {DeleteOutlined, EditOutlined} from '@/ui-kit/icons';
import {logger} from '@/utils/logger';
import {useLine} from '../add-line/use-line';
import styles from './line-item.module.scss';

export const LineItem = ({data}) => {
  const [editable, setEditable] = useState(false);
  const {removeLine, updateLine} = useLine();
  const {getLines} = useLines();

  const {name, endDate, startDate} = data;

  const removeItem = async () => {
    await removeLine({id: data.id}).catch(logger.error);
    await getLines().catch(logger.error);
  };

  const onFinish = async ({name, date}) => {
    const startDate = date[0].toISOString();
    const endDate = date[1].toISOString();

    await updateLine({id: data.id, name, startDate, endDate}).catch(
      logger.error,
    );
    setEditable(false);
    await getLines().catch(logger.error);
  };

  const contentBox = (
    <>
      <Typography.Paragraph ellipsis={true} className={styles.name}>
        {name}
      </Typography.Paragraph>
      <div className={styles.rightSide}>
        <div className={styles.duration}>
          <strong className={styles.durationLabel}>Duration: </strong>{' '}
          {startDate} - {endDate}
        </div>
        <div>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setEditable(true)}
          />
          <Popconfirm
            title="Are you sure?"
            placement="left"
            onConfirm={removeItem}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger={true} icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      </div>
    </>
  );

  const form = (
    <AddLineForm
      name={name}
      startDate={data.startDate}
      endDate={data.endDate}
      onFinish={onFinish}
      extraAction={
        <Button
          className={styles.cancelButton}
          onClick={() => setEditable(false)}
        >
          Cancel
        </Button>
      }
    />
  );

  return (
    <LineWrapper className={styles.wrapper}>
      {editable ? form : contentBox}
    </LineWrapper>
  );
};
