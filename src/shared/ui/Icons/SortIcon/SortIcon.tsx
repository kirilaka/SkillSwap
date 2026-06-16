import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import sortSvg from './SortIcon.svg';

interface SortIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const SortIcon = ({ className }: SortIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={sortSvg} alt="" />
    </IconWrapper>
  );
};
