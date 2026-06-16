import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import moonSvg from './MoonIcon.svg';

interface MoonIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const MoonIcon = ({ className }: MoonIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={moonSvg} alt="" />
    </IconWrapper>
  );
};
