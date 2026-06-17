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
    <div className={clsx(styles.wrapper, className)}>
      <IconWrapper>
        <img src={notificationSvg} alt="" />
      </IconWrapper>
      {hasNew && <span className={styles.dot} />}
    </div>
  );
};
