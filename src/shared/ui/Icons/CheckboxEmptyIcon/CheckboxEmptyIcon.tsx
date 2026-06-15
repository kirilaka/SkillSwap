import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import checkboxEmptySvg from './CheckboxEmptyIcon.svg';
import styles from './CheckboxEmptyIcon.module.scss';

interface CheckboxEmptyIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const CheckboxEmptyIcon = ({ className }: CheckboxEmptyIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={checkboxEmptySvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
