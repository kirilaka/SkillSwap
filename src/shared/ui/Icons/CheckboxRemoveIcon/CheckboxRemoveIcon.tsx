import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import checkboxRemoveSvg from './CheckboxRemoveIcon.svg';

interface CheckboxRemoveIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const CheckboxRemoveIcon = ({ className }: CheckboxRemoveIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={checkboxRemoveSvg} alt="" />
    </IconWrapper>
  );
};
