import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import plusCircleSvg from './PlusCircleIcon.svg';
import styles from './PlusCircleIcon.module.scss';

interface PlusCircleIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const PlusCircleIcon = ({ className }: PlusCircleIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={plusCircleSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
