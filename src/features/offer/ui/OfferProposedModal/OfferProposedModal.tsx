import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button/Button';
import clsx from 'clsx';
import styles from './OfferProposedModal.module.scss';
import { NotificationIcon } from '@/shared/ui/Icons/NotificationIcon/NotificationIcon';

interface OfferProposedModalProps {
  /** Состояние модального окна: открыто/закрыто */
  isOpen?: boolean;
  /** Обработчик закрытия модального окна */
  onClose?: () => void;
  /** Дополнительные CSS-классы для внешней стилизации */
  className?: string;
}
export const OfferProposedModal = ({ className, isOpen, onClose }: OfferProposedModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={clsx(styles.OfferProposedModal, styles.modalContent, className)}
    >
      <NotificationIcon className={styles.icon} />
      <div className={styles.textGroup}>
        <h2 className={styles.title}>Вы предложили обмен</h2>
        <p className={styles.description}>Теперь дождитесь подтверждения. Вам придет уведомление</p>
      </div>
      <Button className={styles.btn} buttonType="primary" onClick={onClose}>
        Готово
      </Button>
    </Modal>
  );
};
