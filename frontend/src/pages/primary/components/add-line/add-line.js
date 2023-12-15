import {AddLineForm} from '@/pages/primary/components/add-line-form';
import {LineWrapper} from '@/pages/primary/components/line-wrapper/line-wrapper';
import {logger} from '@/utils/logger';
import {useLines} from '../lines-list/use-lines';
import {useLine} from './use-line';

export const AddLine = () => {
  const {addLine} = useLine();
  const {getLines} = useLines();

  const onFinish = async ({name, date}) => {
    const startDate = date[0].toISOString();
    const endDate = date[1].toISOString();

    await addLine({name, startDate, endDate}).catch(logger.error);
    await getLines().catch(logger.error);
  };

  return (
    <LineWrapper>
      <AddLineForm onFinish={onFinish} />
    </LineWrapper>
  );
};
