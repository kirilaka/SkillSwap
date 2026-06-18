import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import notificationSvg from './NotificationIcon.svg';
import styles from './NotificationIcon.module.scss';
import clsx from 'clsx';

interface NotificationIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
  /** Наличие новых уведомлений */
  hasNew?: boolean;
}

export const NotificationIcon = ({ className, hasNew = false }: NotificationIconProps) => {
  return (
    <IconWrapper className={clsx(styles.iconWrapper, className)}>
      <img src={notificationSvg} alt="" />
      {hasNew && <span className={styles.dot} />}
    </IconWrapper>
  );
};
