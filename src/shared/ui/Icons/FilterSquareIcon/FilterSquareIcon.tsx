import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import filterSquareSvg from './FilterSquareIcon.svg';

interface FilterSquareIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const FilterSquareIcon = ({ className }: FilterSquareIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={filterSquareSvg} alt="" />
    </IconWrapper>
  );
};
