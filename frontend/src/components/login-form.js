import {Button, Form, Input} from '@/ui-kit';

export const LoginForm = ({onFinish, onFinishFailed, signUp = false}) => {
  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
      {signUp && (
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
      )}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      {signUp && (
        <Form.Item
          label="Confirm Password"
          name="confirmation"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({getFieldValue}) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
          {signUp ? 'SIGN UP' : 'SIGN IN'}
        </Button>
      </Form.Item>
    </Form>
  );
};
