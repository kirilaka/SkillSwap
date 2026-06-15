import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import moreCircleSvg from './MoreCircleIcon.svg';
import styles from './MoreCircleIcon.module.scss';

interface MoreCircleIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const MoreCircleIcon = ({ className }: MoreCircleIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={moreCircleSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
