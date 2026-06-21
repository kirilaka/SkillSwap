import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button/Button';
import clsx from 'clsx';
import styles from './OfferProposedModal.module.scss';
import NotificationSvg from '@/shared/ui/Icons/NotificationIcon/NotificationIcon.svg?react';
interface OfferProposedModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}
export const OfferProposedModal = ({ className, isOpen, onClose }: OfferProposedModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={clsx(styles.OfferProposedModal, className)}>
      <div className={styles.modalContent}>
        <NotificationSvg className={styles.icon} />
        <div className={styles.textGroup}>
          <p className={styles.title}>Вы предложили обмен</p>
          <p className={styles.description}>
            Теперь дождитесь подтверждения. Вам придет уведомление
          </p>
        </div>
        <Button className={styles.btn} buttonType="primary" onClick={onClose}>
          Готово
        </Button>
      </div>
    </Modal>
  );
};
