import clsx from 'clsx';
import styles from './NavigationItem.module.scss';
import { ChevronIcon } from '@/shared/ui/Icons/ChevronIcon/ChevronIcon';

interface NavItemProps {
  /** текст пункта навигации */
  label: string;
  /** состояние открытого/закрытого пункта */
  isOpen?: boolean;
  /** Указывает, является ли пункт навигации активным (текущий роут, выбранный элемент и т.д.) */
  isActive?: boolean;
  /** обработчик клика */
  onClick?: () => void;
  /** наличие галочки у компонента ( По умолчанию false ) */
  hasArrow?: boolean;
  /** Доп.классы */
  className?: string;
}

export const NavItem = ({
  label,
  isOpen = false,
  onClick,
  isActive,
  hasArrow = false,
  className,
}: NavItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(className, { [styles.active]: isActive }, styles.navItem)}
    >
      <span className={styles.labelText}>{label}</span>
      {hasArrow && <ChevronIcon isOpen={isOpen} />}
    </button>
  );
};
