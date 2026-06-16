import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import sunSvg from './SunIcon.svg';

interface SunIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const SunIcon = ({ className }: SunIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={sunSvg} alt="" />
    </IconWrapper>
  );
};
