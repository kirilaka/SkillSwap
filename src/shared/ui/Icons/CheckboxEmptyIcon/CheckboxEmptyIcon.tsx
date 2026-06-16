import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import checkboxEmptySvg from './CheckboxEmptyIcon.svg';

interface CheckboxEmptyIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const CheckboxEmptyIcon = ({ className }: CheckboxEmptyIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={checkboxEmptySvg} alt="" />
    </IconWrapper>
  );
};
