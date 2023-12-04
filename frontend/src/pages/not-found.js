import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/routes/constants';
import {Button, Result} from '@/ui-kit';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(ROUTES.BASE)}>
          Back Home
        </Button>
      }
    />
  );
};
