import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import notificationSvg from './NotificationIcon.svg';
import styles from './NotificationIcon.module.scss';

interface NotificationIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const NotificationIcon = ({ className }: NotificationIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={notificationSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
