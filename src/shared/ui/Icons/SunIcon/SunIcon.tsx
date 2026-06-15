import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import sunSvg from './SunIcon.svg';
import styles from './SunIcon.module.scss';

interface SunIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const SunIcon = ({ className }: SunIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={sunSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
