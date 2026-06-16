import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import arrowSvg from './ArrowLeftIcon.svg';

interface ArrowLeftIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ArrowLeftIcon = ({ className }: ArrowLeftIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={arrowSvg} alt="" />
    </IconWrapper>
  );
};
