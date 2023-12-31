import {Outlet} from 'react-router-dom';
import {Header} from '@/components';
import {useAppStore} from '@/services/store';
import {Spin} from '@/ui-kit';
import {LoadingOutlined} from '@/ui-kit/icons';
import styles from './primary.module.scss';

export const PrimaryLayout = () => {
  const {loading} = useAppStore();

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined />} size="large">
      <div>
        <Header />
        <main className={styles.content}>
          <Outlet />
        </main>
        <footer className={styles.footer}>
          <div className={styles.footer__wrapper}>
            {new Date().getFullYear()} Focus Lines
          </div>
        </footer>
      </div>
    </Spin>
  );
};
