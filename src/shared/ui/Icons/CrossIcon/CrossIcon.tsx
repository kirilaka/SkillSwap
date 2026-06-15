import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import crossSvg from './CrossIcon.svg';
import styles from './CrossIcon.module.scss';

interface CrossIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const CrossIcon = ({ className }: CrossIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={crossSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
