import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import homeSvg from './HomeIcon.svg';
import styles from './HomeIcon.module.scss';

interface HomeIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const HomeIcon = ({ className }: HomeIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={homeSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
