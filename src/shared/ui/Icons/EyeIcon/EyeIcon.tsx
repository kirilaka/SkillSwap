import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import eyeSvg from './EyeIcon.svg';
import styles from './EyeIcon.module.scss';

interface EyeIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const EyeIcon = ({ className }: EyeIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={eyeSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
