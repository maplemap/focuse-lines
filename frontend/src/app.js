import {useRoutes} from 'react-router-dom';
import {AuthProvider} from '@/services/auth';
import {AppStoreProvider} from '@/services/store';
import {ThemeProvider} from '@/services/theme';
import {routes as mainRoutes} from './routes';
import './styles/main.scss';

export const App = () => {
  const routes = useRoutes(mainRoutes);

  return (
    <ThemeProvider>
      <AppStoreProvider>
        <AuthProvider>{routes}</AuthProvider>
      </AppStoreProvider>
    </ThemeProvider>
  );
};
