import {Outlet} from 'react-router-dom';
import {Header} from '@/components';
import {useAppStore} from '@/services/store';
import {Spin} from '@/ui-kit';
import styles from './primary.module.scss';

export const PrimaryLayout = () => {
  const {loading} = useAppStore();

  return (
    <Spin spinning={loading}>
      <div>
        <Header />
        <main className={styles.content}>
          <Outlet />
        </main>
        <footer className={styles.footer}>
          <div className={styles.footer__wrapper}>2023 CS50 Final Project</div>
        </footer>
      </div>
    </Spin>
  );
};
