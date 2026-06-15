import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import scrollSquareSvg from './ScrollSquareIcon.svg';
import styles from './ScrollSquareIcon.module.scss';

interface ScrollSquareIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ScrollSquareIcon = ({ className }: ScrollSquareIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={scrollSquareSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
