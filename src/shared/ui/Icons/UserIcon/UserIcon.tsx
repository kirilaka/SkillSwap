import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import userSvg from './UserIcon.svg';
import styles from './UserIcon.module.scss';

interface UserIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const UserIcon = ({ className }: UserIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={userSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
