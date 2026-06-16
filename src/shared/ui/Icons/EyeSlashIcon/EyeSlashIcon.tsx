import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import eyeSlashSvg from './EyeSlashIcon.svg';

interface EyeSlashIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const EyeSlashIcon = ({ className }: EyeSlashIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={eyeSlashSvg} alt="" />
    </IconWrapper>
  );
};
