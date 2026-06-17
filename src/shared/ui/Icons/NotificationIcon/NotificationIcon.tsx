import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import notificationSvg from './NotificationIcon.svg';
import styles from './NotificationIcon.module.scss';

interface NotificationIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
  /** Наличие новых уведомлений */
  hasNew?: boolean;
}

export const NotificationIcon = ({ className, hasNew = false }: NotificationIconProps) => {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <IconWrapper>
        <img src={notificationSvg} alt="" />
      </IconWrapper>
      {hasNew && <span className={styles.dot} />}
    </div>
  );
};
