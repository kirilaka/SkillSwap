import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import bookSvg from './BookIcon.svg';
import styles from './BookIcon.module.scss';

interface BookIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const BookIcon = ({ className }: BookIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={bookSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
