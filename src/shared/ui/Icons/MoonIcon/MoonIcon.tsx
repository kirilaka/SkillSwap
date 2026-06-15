import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import moonSvg from './MoonIcon.svg';
import styles from './MoonIcon.module.scss';

interface MoonIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const MoonIcon = ({ className }: MoonIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={moonSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
