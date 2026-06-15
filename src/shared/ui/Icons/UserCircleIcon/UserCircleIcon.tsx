import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import userCircleSvg from './UserCircleIcon.svg';
import styles from './UserCircleIcon.module.scss';

interface UserCircleIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const UserCircleIcon = ({ className }: UserCircleIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={userCircleSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
