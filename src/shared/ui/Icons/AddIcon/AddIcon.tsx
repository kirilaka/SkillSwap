import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import addSvg from './AddIcon.svg';
import styles from './AddIcon.module.scss';

interface AddIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const AddIcon = ({ className }: AddIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={addSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
