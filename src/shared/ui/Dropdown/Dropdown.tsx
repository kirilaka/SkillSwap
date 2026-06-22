import { ReactNode, useEffect, useRef } from 'react';
import styles from './Dropdown.module.scss';
import { clsx } from 'clsx';
import { CSSTransition } from 'react-transition-group';
interface DropdownProps {
  /** Обработчик действий при закрытии */
  onClose: () => void;
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
export const Dropdown = ({ onClose, isOpen = false, children, className }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const handleDropdownOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        console.log(dropdownRef.current.contains(event.target as Node));
        onClose();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleDropdownOutside);
    }, 0);
    document.addEventListener('keydown', handleEsc);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleDropdownOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

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
      <div ref={dropdownRef} className={clsx(styles.dropdown, className)}>
        {children}
      </div>
    </CSSTransition>
  );
};
