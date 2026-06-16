import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import moreCircleSvg from './MoreCircleIcon.svg';

interface MoreCircleIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const MoreCircleIcon = ({ className }: MoreCircleIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={moreCircleSvg} alt="" />
    </IconWrapper>
  );
};
