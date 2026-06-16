import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import userCircleSvg from './UserCircleIcon.svg';

interface UserCircleIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const UserCircleIcon = ({ className }: UserCircleIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={userCircleSvg} alt="" />
    </IconWrapper>
  );
};
