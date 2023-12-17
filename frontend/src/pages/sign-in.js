import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LoginForm} from '@/components';
import {ROUTES} from '@/routes/constants';
import {useAuth} from '@/services/auth';
import {Col, Row, Typography, notification} from '@/ui-kit';

const {Title} = Typography;

export const SignInPage = () => {
  const {login, isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.BASE);
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async ({email, password}) => {
    try {
      await login({email, password});
    } catch (e) {
      notificationApi.error({message: e.message});
    }
  };

  return (
    !isAuthenticated && (
      <Row gutter={[24, 0]} justify="space-around">
        {contextHolder}
        <Col xs={{span: 24, offset: 0}} lg={{span: 6}} md={{span: 12}}>
          <Title>Sign In</Title>
          <Title level={5}>Enter your email and password to sign in</Title>
          <LoginForm onFinish={onFinish} />
          <p>
            Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </Col>
      </Row>
    )
  );
};
