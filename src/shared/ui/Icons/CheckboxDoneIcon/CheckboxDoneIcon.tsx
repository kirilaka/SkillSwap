import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import checkboxDoneSvg from './CheckboxDoneIcon.svg';

interface CheckboxDoneIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const CheckboxDoneIcon = ({ className }: CheckboxDoneIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={checkboxDoneSvg} alt="" />
    </IconWrapper>
  );
};
