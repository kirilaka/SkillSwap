import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import radioButtonSvg from './RadioButtonIcon.svg';

interface RadioButtonIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const RadioButtonIcon = ({ className }: RadioButtonIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={radioButtonSvg} alt="" />
    </IconWrapper>
  );
};
