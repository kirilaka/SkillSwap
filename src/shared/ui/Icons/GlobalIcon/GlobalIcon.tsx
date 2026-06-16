import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import globalSvg from './GlobalIcon.svg';

interface GlobalIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const GlobalIcon = ({ className }: GlobalIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={globalSvg} alt="" />
    </IconWrapper>
  );
};
