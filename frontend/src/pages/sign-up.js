import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LoginForm} from '@/components';
import {ROUTES} from '@/routes/constants';
import {useAuth} from '@/services/auth';
import {Col, Row, Typography, notification} from '@/ui-kit';

const {Title} = Typography;

export const SignUpPage = () => {
  const {isAuthenticated, registration} = useAuth();
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.BASE);
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async ({name, email, password, confirmation}) => {
    try {
      await registration({name, email, password, confirmation});
    } catch (e) {
      notificationApi.error({message: e.message});
    }
  };

  return (
    !isAuthenticated && (
      <Row gutter={[24, 0]} justify="space-around">
        {contextHolder}
        <Col xs={{span: 24, offset: 0}} lg={{span: 6}} md={{span: 12}}>
          <Title>Sign Up</Title>
          <Title level={5}>
            Enter your email and password with confirmation to sign up
          </Title>
          <LoginForm onFinish={onFinish} signUp={true} />
          <p>
            Do you have an account? <Link to="/sign-in">Sign In</Link>
          </p>
        </Col>
      </Row>
    )
  );
};
