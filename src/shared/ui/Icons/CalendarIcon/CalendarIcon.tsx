import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import calendarSvg from './CalendarIcon.svg';
import styles from './CalendarIcon.module.scss';

interface CalendarIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const CalendarIcon = ({ className }: CalendarIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={calendarSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
