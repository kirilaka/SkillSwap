import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import eyeSlashSvg from './EyeSlashIcon.svg';
import styles from './EyeSlashIcon.module.scss';

interface EyeSlashIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const EyeSlashIcon = ({ className }: EyeSlashIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={eyeSlashSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
