import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button/Button';
import clsx from 'clsx';
import styles from './OfferCreatedModal.module.scss';
import { DoneIcon } from '@/shared/ui/Icons/DoneIcon/DoneIcon';

interface OfferCreatedModalProps {
  /** Состояние модального окна: открыто/закрыто */
  isOpen?: boolean;
  /** Обработчик закрытия модального окна */
  onClose?: () => void;
  /** Дополнительные CSS-классы для внешней стилизации */
  className?: string;
}
export const OfferCreatedModal = ({ className, isOpen, onClose }: OfferCreatedModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={clsx(styles.OfferCreatedModal, styles.modalContent, className)}
    >
      <DoneIcon className={styles.icon} />
      <div className={styles.textGroup}>
        <h2 className={styles.title}>Ваше предложение создано</h2>
        <p className={styles.description}>Теперь вы можете предложить обмен</p>
      </div>
      <Button className={styles.btn} buttonType="primary" onClick={onClose}>
        Готово
      </Button>
    </Modal>
  );
};
