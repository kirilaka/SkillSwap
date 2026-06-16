import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import userSvg from './UserIcon.svg';

interface UserIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const UserIcon = ({ className }: UserIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={userSvg} alt="" />
    </IconWrapper>
  );
};
