import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import doneSvg from './DoneIcon.svg';
import styles from './DoneIcon.module.scss';

interface DoneIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const DoneIcon = ({ className }: DoneIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={doneSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
