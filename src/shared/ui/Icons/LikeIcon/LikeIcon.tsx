import { IconWrapper } from '../IconWrapper';
import LikeSvg from './LikeIcon.svg?react';

export interface LikeIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

/** Heart icon for favorite button */
export const LikeIcon = ({ className }: LikeIconProps) => {
  return (
    <IconWrapper className={className}>
      <LikeSvg />
    </IconWrapper>
  );
};
