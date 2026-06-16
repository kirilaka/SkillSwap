import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import likeSvg from './LikeIcon.svg';

interface LikeIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const LikeIcon = ({ className }: LikeIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={likeSvg} alt="" />
    </IconWrapper>
  );
};
