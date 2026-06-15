import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import searchSvg from './SearchIcon.svg';
import styles from './ArrowSquareIcon.module.scss';

interface SearchIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const SearchIcon = ({ className }: SearchIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={searchSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
