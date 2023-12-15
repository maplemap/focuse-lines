import {Navigate} from 'react-router-dom';
import {PrimaryLayout} from '@/layouts';
import {NotFoundPage, PrimaryPage, SignInPage, SignUpPage} from '@/pages';
import {ProtectedRoute} from '@/routes/components/protected-route';
import {ROUTES} from '@/routes/constants';

export const routes = [
  {
    element: <PrimaryLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.BASE,
            element: <PrimaryPage />,
          },
        ],
      },
      {
        path: ROUTES.SIGN_IN,
        exact: true,
        element: <SignInPage />,
      },
      {
        path: ROUTES.SIGN_UP,
        exact: true,
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.NOT_FOUND} />,
  },
];
