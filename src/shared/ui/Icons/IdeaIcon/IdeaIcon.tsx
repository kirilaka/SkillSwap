import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import ideaSvg from './IdeaIcon.svg';
import styles from './IdeaIcon.module.scss';

interface IdeaIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const IdeaIcon = ({ className }: IdeaIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={ideaSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
