import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clockSvg from './ClockIcon.svg';

interface ClockIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ClockIcon = ({ className }: ClockIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={clockSvg} alt="" />
    </IconWrapper>
  );
};
