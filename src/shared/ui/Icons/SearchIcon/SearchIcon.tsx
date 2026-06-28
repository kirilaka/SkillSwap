import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import SearchSvg from './SearchIcon.svg?react';

interface SearchIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const SearchIcon = ({ className }: SearchIconProps) => {
  return (
    <IconWrapper className={className}>
      <SearchSvg />
    </IconWrapper>
  );
};
