import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import notificationSvg from './NotificationIcon.svg';

interface NotificationIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const NotificationIcon = ({ className }: NotificationIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={notificationSvg} alt="" />
    </IconWrapper>
  );
};
