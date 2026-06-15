import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import checkboxRemoveSvg from './CheckboxRemoveIcon.svg';
import styles from './CheckboxRemoveIcon.module.scss';

interface CheckboxRemoveIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const CheckboxRemoveIcon = ({ className }: CheckboxRemoveIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={checkboxRemoveSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
