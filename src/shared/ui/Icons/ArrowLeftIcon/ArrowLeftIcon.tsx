import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import arrowSvg from './ArrowLeftIcon.svg';
import styles from './ArrowLeftIcon.module.scss';

interface ArrowLeftIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ArrowLeftIcon = ({ className }: ArrowLeftIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={arrowSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
