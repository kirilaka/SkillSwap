import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import clockSvg from './ClockIcon.svg';
import styles from './ClockIcon.module.scss';

interface ClockIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ClockIcon = ({ className }: ClockIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={clockSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
