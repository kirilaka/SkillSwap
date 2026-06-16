import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import eyeSvg from './EyeIcon.svg';

interface EyeIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const EyeIcon = ({ className }: EyeIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={eyeSvg} alt="" />
    </IconWrapper>
  );
};
