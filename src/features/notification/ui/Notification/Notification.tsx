import styles from './Notification.module.scss';
import clsx from 'clsx';
import { IdeaIcon } from '@/shared/ui/Icons/IdeaIcon/IdeaIcon';
import { Button } from '@/shared/ui/Button/Button';

export interface NotificationProps {
  /** Уникальный идентификатор уведомления */
  id: string;
  /** Заголовок уведомления */
  title: string;
  /** Дополнительный текст */
  description?: string;
  /** Состояние: новое или просмотренное */
  isNew?: boolean;
  /** id заявки, если по клику нужно открыть заявку */
  requestId?: string;
  /** Обработчик клика */
  onClick?: () => void;
  /** Дата уведомления */
  date?: string;
  /** Доп. классы */
  className?: string;
}

export const Notification = ({
  title,
  description,
  date,
  isNew = false,
  onClick,
  className,
}: NotificationProps) => (
  <div className={clsx(styles.notification, isNew ? styles.new : styles.viewed, className)}>
    <div className={styles.topRow}>
      <IdeaIcon className={styles.icon} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {date && <span className={styles.date}>{date}</span>}
    </div>
    {isNew && (
      <Button onClick={onClick} buttonType="primary" className={styles.button}>
        Перейти
      </Button>
    )}
  </div>
);
