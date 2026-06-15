import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import globalSvg from './GlobalIcon.svg';
import styles from './GlobalIcon.module.scss';

interface GlobalIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const GlobalIcon = ({ className }: GlobalIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={globalSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
