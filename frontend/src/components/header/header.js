import {useAuth} from '@/services/auth';
import {useAppStore} from '@/services/store';
import {Avatar, Dropdown, Typography} from '@/ui-kit';
import {LineChartOutlined} from '@/ui-kit/icons';
import {logger} from '@/utils/logger';
import styles from './header.module.scss';

export const Header = () => {
  const {setLoading} = useAppStore();
  const {isAuthenticated, logout, user} = useAuth();

  const userNameFirstLetter = user?.name[0].toUpperCase();

  const menuItems = [
    {
      key: 'logout',
      label: 'Logout',
      onClick: async () => {
        setLoading(true);
        await logout().catch(logger.error);
        setLoading(false);
      },
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__logo}>
          <LineChartOutlined />
        </div>
        <div className={styles.header__brand}>Focus Lines</div>
        {isAuthenticated && (
          <div className={styles.header__rightBlock}>
            <Dropdown menu={{items: menuItems}}>
              <div className={styles.header__userBox}>
                <Typography.Paragraph
                  ellipsis={true}
                  className={styles.header__userName}
                >
                  {user?.name}
                </Typography.Paragraph>
                <Avatar>{userNameFirstLetter}</Avatar>
              </div>
            </Dropdown>
          </div>
        )}
      </div>
    </header>
  );
};
