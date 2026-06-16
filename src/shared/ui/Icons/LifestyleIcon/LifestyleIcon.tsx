import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import lifestyleSvg from './LifestyleIcon.svg';

interface LifestyleIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const LifestyleIcon = ({ className }: LifestyleIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={lifestyleSvg} alt="" />
    </IconWrapper>
  );
};
