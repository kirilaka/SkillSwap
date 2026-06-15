import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import filterSquareSvg from './FilterSquareIcon.svg';
import styles from './FilterSquareIcon.module.scss';

interface FilterSquareIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const FilterSquareIcon = ({ className }: FilterSquareIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={filterSquareSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
