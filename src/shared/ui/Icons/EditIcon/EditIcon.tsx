import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import editSvg from './EditIcon.svg';

interface EditIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const EditIcon = ({ className }: EditIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={editSvg} alt="" />
    </IconWrapper>
  );
};
