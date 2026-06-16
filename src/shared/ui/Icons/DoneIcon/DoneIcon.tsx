import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import doneSvg from './DoneIcon.svg';

interface DoneIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const DoneIcon = ({ className }: DoneIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={doneSvg} alt="" />
    </IconWrapper>
  );
};
