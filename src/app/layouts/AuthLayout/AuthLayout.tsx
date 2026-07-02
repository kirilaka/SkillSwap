import { Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '@/shared/ui/Logo/Logo';
import { CrossIcon } from '@/shared/ui/Icons/CrossIcon/CrossIcon';
import { ROUTES } from '@/shared/lib/constants';
import { Button } from '@/shared/ui/Button/Button';
import styles from './AuthLayout.module.scss';

export const AuthLayout = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className={styles.authLayout}>
      <header className={styles.header}>
        <Logo />
        <Button
          buttonType="tertiary"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Закрыть"
        >
          <span>Закрыть</span>
          <CrossIcon />
        </Button>
      </header>
      <Outlet />
    </div>
  );
};
