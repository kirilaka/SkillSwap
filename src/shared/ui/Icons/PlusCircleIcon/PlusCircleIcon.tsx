import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import plusCircleSvg from './PlusCircleIcon.svg';

interface PlusCircleIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const PlusCircleIcon = ({ className }: PlusCircleIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={plusCircleSvg} alt="" />
    </IconWrapper>
  );
};
