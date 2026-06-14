import { IconWrapper } from '@/shared/ui/Icons/IconWrapper/IconWrapper';
import clsx from 'clsx';
import arrowSquareSvg from './ArrowSquareIcon.svg';
import styles from './ArrowSquareIcon.module.scss';

interface ArrowSquareIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ArrowSquareIcon = ({ className }: ArrowSquareIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={arrowSquareSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
