import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import checkboxDoneSvg from './CheckboxDoneIcon.svg';
import styles from './CheckboxDoneIcon.module.scss';

interface CheckboxDoneIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const CheckboxDoneIcon = ({ className }: CheckboxDoneIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={checkboxDoneSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
