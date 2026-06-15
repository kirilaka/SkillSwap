import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import editSvg from './EditIcon.svg';
import styles from './EditIcon.module.scss';

interface EditIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const EditIcon = ({ className }: EditIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={editSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
