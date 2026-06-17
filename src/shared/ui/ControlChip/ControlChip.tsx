import clsx from 'clsx';
import styles from './ControlChip.module.scss';
import { ChevronIcon } from '@/shared/ui/Icons/ChevronIcon/ChevronIcon';
import { CrossIcon } from '@/shared/ui/Icons/CrossIcon/CrossIcon';

interface ControlChipProps {
  /** текст пункта */
  label: string;
  /** состояние открытого/закрытого пункта */
  isOpen?: boolean;
  /** Указывает, является ли пункт активным (текущий роут, выбранный элемент и т.д.) */
  isActive?: boolean;
  /** обработчик клика */
  onClick?: () => void;
  /** Наличие галочки или крестика, по умолчанию нет */
  iconVariant?: 'Chevron' | 'Cross' | '';
  /** Доп.классы */
  className?: string;
}

export const ControlChip = ({
  label,
  isOpen = false,
  onClick,
  isActive = false,
  iconVariant = '',
  className,
}: ControlChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(className, { [styles.active]: isActive }, styles.controlChip)}
    >
      <span className={styles.labelText}>{label}</span>
      {iconVariant && (iconVariant === 'Chevron' ? <ChevronIcon isOpen={isOpen} /> : <CrossIcon />)}
    </button>
  );
};
