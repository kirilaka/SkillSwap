import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import SunSvg from './SunIcon.svg?react';

interface SunIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const SunIcon = ({ className }: SunIconProps) => {
  return (
    <IconWrapper className={className}>
      <SunSvg />
    </IconWrapper>
  );
};
