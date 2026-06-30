import { Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '@/shared/ui/Logo/Logo';
import { CrossIcon } from '@/shared/ui/Icons/CrossIcon/CrossIcon';
import { ROUTES } from '@/shared/lib/constants';
import { Button } from '@/shared/ui/Button/Button';
import styles from './AuthLayout.module.scss';
import clsx from 'clsx';

export const AuthLayout = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className={clsx(styles.authLayout, className)}>
      <header className={styles.header}>
        <Logo />
        <Button
          type="button"
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
