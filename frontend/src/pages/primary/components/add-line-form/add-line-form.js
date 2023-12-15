import dayjs from 'dayjs';
import {Button, DatePicker, Form, Input} from '@/ui-kit';
import styles from './add-line-form.module.scss';

export const AddLineForm = ({
  onFinish,
  extraAction,
  name,
  startDate,
  endDate,
}) => {
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    onFinish(data);
    form.resetFields();
  };

  const getInitialValues = () => {
    const initialValues = {name};

    if (startDate && endDate) {
      initialValues.date = [dayjs(startDate), dayjs(endDate)];
    }
    return initialValues;
  };

  return (
    <Form
      form={form}
      labelCol={{flex: '60px'}}
      labelAlign="left"
      labelWrap
      layout="horizontal"
      onFinish={onSubmit}
      className={styles.form}
      initialValues={getInitialValues()}
    >
      <Form.Item
        className={styles.field}
        name="name"
        rules={[{required: true, message: ''}]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        className={styles.field}
        name="date"
        rules={[{required: true, message: ''}]}
      >
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item className={styles.action}>
        {extraAction}
        <Button htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  );
};
