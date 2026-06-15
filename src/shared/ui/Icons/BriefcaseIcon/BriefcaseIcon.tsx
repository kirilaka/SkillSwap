import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import briefcaseSvg from './BriefcaseIcon.svg';
import styles from './BriefcaseIcon.module.scss';

interface BriefcaseIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const BriefcaseIcon = ({ className }: BriefcaseIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={briefcaseSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
