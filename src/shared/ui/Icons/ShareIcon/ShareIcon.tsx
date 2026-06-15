import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import shareSvg from './ShareIcon.svg';
import styles from './ShareIcon.module.scss';

interface ShareIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ShareIcon = ({ className }: ShareIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={shareSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
