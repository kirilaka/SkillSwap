import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import sortSvg from './SortIcon.svg';
import styles from './SortIcon.module.scss';

interface SortIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const SortIcon = ({ className }: SortIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={sortSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
