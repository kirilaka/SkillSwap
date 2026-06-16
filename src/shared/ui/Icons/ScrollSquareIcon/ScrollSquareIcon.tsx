import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import scrollSquareSvg from './ScrollSquareIcon.svg';

interface ScrollSquareIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ScrollSquareIcon = ({ className }: ScrollSquareIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={scrollSquareSvg} alt="" />
    </IconWrapper>
  );
};
