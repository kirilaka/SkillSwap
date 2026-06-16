import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import arrowSquareSvg from './ArrowSquareIcon.svg';

interface ArrowSquareIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ArrowSquareIcon = ({ className }: ArrowSquareIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={arrowSquareSvg} alt="" />
    </IconWrapper>
  );
};
