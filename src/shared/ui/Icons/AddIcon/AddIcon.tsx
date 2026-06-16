import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import addSvg from './AddIcon.svg';

interface AddIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const AddIcon = ({ className }: AddIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={addSvg} alt="" />
    </IconWrapper>
  );
};
