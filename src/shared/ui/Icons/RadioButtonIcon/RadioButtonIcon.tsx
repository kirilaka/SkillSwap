import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import radioButtonSvg from './RadioButtonIcon.svg';
import styles from './RadioButtonIcon.module.scss';

interface RadioButtonIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const RadioButtonIcon = ({ className }: RadioButtonIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={radioButtonSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
