import { clsx } from 'clsx';
import { ReactNode, useEffect, useRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Modal.module.scss';
import { Box } from '../Box/Box';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ isOpen = false, onClose, children, className }: ModalProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  useEffect(() => {
    const getScrollbarWidth = () => {
      return window.innerWidth - document.documentElement.clientWidth;
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      const scrollbarWidth = getScrollbarWidth();
      document.body.style.overflow = 'hidden';
      document.body.style.paddingInlineEnd = `${scrollbarWidth}px`;
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.paddingInlineEnd = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingInlineEnd = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const modalRoot = document.getElementById('modal-root');

  return createPortal(
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        enterDone: styles.enterDone,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div className={styles.Modal} onClick={handleOverlayClick} ref={nodeRef}>
        <Box className={clsx(styles.content, className)}>{children}</Box>
      </div>
    </CSSTransition>,
    modalRoot ?? document.body,
  );
};
