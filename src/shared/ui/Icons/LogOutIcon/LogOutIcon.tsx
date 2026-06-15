import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import logOutSvg from './LogOutIcon.svg';
import styles from './LogOutIcon.module.scss';

interface LogOutIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const LogOutIcon = ({ className }: LogOutIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={logOutSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
