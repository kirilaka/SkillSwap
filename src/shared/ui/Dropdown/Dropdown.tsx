import { ReactNode } from 'react';
import styles from './Dropdown.module.scss';
import { clsx } from 'clsx';
import { CSSTransition } from 'react-transition-group';
interface DropdownProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}
export const Dropdown = ({ isOpen, children, className }: DropdownProps) => {
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
