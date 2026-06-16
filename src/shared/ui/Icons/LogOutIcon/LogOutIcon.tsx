import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import logOutSvg from './LogOutIcon.svg';

interface LogOutIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const LogOutIcon = ({ className }: LogOutIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={logOutSvg} alt="" />
    </IconWrapper>
  );
};
