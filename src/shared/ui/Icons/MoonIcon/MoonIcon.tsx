import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import MoonSvg from './MoonIcon.svg?react';

interface MoonIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const MoonIcon = ({ className }: MoonIconProps) => {
  return (
    <IconWrapper className={className}>
      <MoonSvg />
    </IconWrapper>
  );
};
