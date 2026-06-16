import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import searchSvg from './SearchIcon.svg';

interface SearchIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const SearchIcon = ({ className }: SearchIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={searchSvg} alt="" />
    </IconWrapper>
  );
};
