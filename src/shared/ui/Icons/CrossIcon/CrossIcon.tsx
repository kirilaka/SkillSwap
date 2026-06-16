import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import crossSvg from './CrossIcon.svg';

interface CrossIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const CrossIcon = ({ className }: CrossIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={crossSvg} alt="" />
    </IconWrapper>
  );
};
