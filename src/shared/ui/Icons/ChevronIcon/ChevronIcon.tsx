import styles from './ChevronIcon.module.scss';
import chevronSvg from './Chevron.svg';
import clsx from 'clsx';
import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';

type Orientation = 'vertical' | 'horizontal';

interface ChevronIconPrors {
  /** Состояние открыта/закрыта */
  isOpen?: boolean;
  /** Ориентация, по умол. horizontal*/
  orientation?: Orientation;
  /** Доп. классы */
  className?: string;
}

export const ChevronIcon = ({
  isOpen = false,
  orientation = 'horizontal',
  className,
}: ChevronIconPrors) => {
  return (
    <IconWrapper
      className={clsx(
        styles.chevron,
        styles[orientation],
        isOpen && styles[`${orientation}Open`],
        className,
      )}
    >
      <img src={chevronSvg} alt="" />
    </IconWrapper>
  );
};
