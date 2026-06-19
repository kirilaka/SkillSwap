import { clsx } from 'clsx';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import cls from './Modal.module.scss';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ isOpen = false, onClose, children, className }: ModalProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  // Блокировка прокрутки страницы при isOpen: true
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal-anim"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div className={cls.Modal} onClick={onClose} ref={nodeRef}>
        <div className={clsx(cls.content, className)} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </CSSTransition>,
    modalRoot,
  );
};
