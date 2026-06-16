import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import shareSvg from './ShareIcon.svg';

interface ShareIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ShareIcon = ({ className }: ShareIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={shareSvg} alt="" />
    </IconWrapper>
  );
};
