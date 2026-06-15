import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import requestSvg from './RequestIcon.svg';
import styles from './RequestIcon.module.scss';

interface RequestIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const RequestIcon = ({ className }: RequestIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={requestSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
