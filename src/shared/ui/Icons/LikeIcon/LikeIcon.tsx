import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import likeSvg from './LikeIcon.svg';

interface LikeIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const LikeIcon = ({ className }: LikeIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={likeSvg} alt="" />
    </IconWrapper>
  );
};
