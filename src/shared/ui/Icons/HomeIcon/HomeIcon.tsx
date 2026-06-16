import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import homeSvg from './HomeIcon.svg';

interface HomeIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const HomeIcon = ({ className }: HomeIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={homeSvg} alt="" />
    </IconWrapper>
  );
};
