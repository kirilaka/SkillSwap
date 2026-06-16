import clsx from 'clsx';
import { ChevronIcon } from '../ChevronIcon/ChevronIcon';
import styles from './CountIcon.module.scss';

interface CountIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
  /** Обработчик клика по левой иконке */
  onClickLeft?: () => void;
  /** Обработчик клика по правой иконке */
  onClickRight?: () => void;
}

export const CountIcon = ({ className, onClickLeft, onClickRight }: CountIconProps) => {
  return (
    <div className={clsx(styles.count, className)}>
      <button type="button" onClick={onClickLeft}>
        <ChevronIcon className={styles.chevron} orientation="vertical" isOpen={true} />
      </button>

      <button type="button" onClick={onClickRight}>
        <ChevronIcon className={styles.chevron} orientation="vertical" />
      </button>
    </div>
  );
};
