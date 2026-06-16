import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import scrollSvg from './ScrollIcon.svg';

interface ScrollIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ScrollIcon = ({ className }: ScrollIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={scrollSvg} alt="" />
    </IconWrapper>
  );
};
