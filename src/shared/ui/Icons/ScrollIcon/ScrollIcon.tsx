import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import scrollSvg from './ScrollIcon.svg';
import styles from './ScrollIcon.module.scss';

interface ScrollIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ScrollIcon = ({ className }: ScrollIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={scrollSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
