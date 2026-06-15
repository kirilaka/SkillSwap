import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import lifestyleSvg from './LifestyleIcon.svg';
import styles from './LifestyleIcon.module.scss';

interface LifestyleIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const LifestyleIcon = ({ className }: LifestyleIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={lifestyleSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
