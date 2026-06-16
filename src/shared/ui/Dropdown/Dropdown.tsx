import { ReactNode } from 'react';
import styles from './Dropdown.module.scss';
import { clsx } from 'clsx';
import { CSSTransition } from 'react-transition-group';
interface DropdownProps {
  /** Управляет видимостью выпадающего списка (открыт/закрыт) */
  isOpen: boolean;
  /** Дочерние компоненты для отрисовки внутри выпадающего меню */
  children: ReactNode;
  /** Дополнительные CSS-классы для внешней стилизации и позиционирования */
  className?: string;
}

/**
 * Универсальный компонент выпадающего меню.
 * Плавно появляется и исчезает, подстраивая размеры под внутренний контент.
 */
export const Dropdown = ({ isOpen = false, children, className }: DropdownProps) => {
  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
      unmountOnExit
    >
      <div className={clsx(styles.dropdown, className)}>{children}</div>
    </CSSTransition>
  );
};
