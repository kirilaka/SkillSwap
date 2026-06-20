import { useState, useCallback } from 'react';
import { NotificationIcon } from '@/shared/ui/Icons/NotificationIcon/NotificationIcon';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import styles from './NotificationButton.module.scss';
import { Notification } from '../Notification/Notification';
import type { User } from '@/shared/types';

export interface NotificationType {
  // Уникальный идентификатор уведомления
  id: string;
  // Состояние уведомления:  new — не прочитано, viewed — прочитано
  viewState: 'new' | 'viewed';
  // Статус обмена: 'sent' — запрос/предложение отправлен; 'completed' — обмен завершён.
  exchangeStatus: 'sent' | 'completed';
  // Дата создания уведомления.
  date: Date;
  // Пользователь, создавший уведомление.
  user: User | null;
}

interface NotificationButtonProps {
  hasNew?: boolean;
  notificationsNew?: NotificationType[] | null;
  notificationsOld?: NotificationType[] | null;
  className?: string;
}

export const NotificationButton = ({
  hasNew = false,
  notificationsNew = null,
  notificationsOld = null,
  className,
}: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const hasNotifications =
    (notificationsNew && notificationsNew.length > 0) ||
    (notificationsOld && notificationsOld.length > 0);

  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      onClick={handleClick}
      aria-label="Уведомления"
    >
      <NotificationIcon hasNew={hasNew} className={styles.icon} />
      <Dropdown isOpen={isOpen} className={styles.dropdown}>
        <div>
          {!hasNotifications ? (
            <p className={styles.empty}>Тут пока что пусто</p>
          ) : (
            <div className={styles.dropdownContent}>
              {notificationsNew && notificationsNew.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Новые уведомления</h3>
                  <div className={styles.list}>
                    {notificationsNew.map((notification) => (
                      <Notification
                        className={styles.notification}
                        key={notification.id}
                        viewState={notification.viewState}
                        exchangeStatus={notification.exchangeStatus}
                        date={notification.date}
                        user={notification.user}
                      />
                    ))}
                  </div>
                </div>
              )}
              {notificationsOld && notificationsOld.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Просмотренные</h3>
                  <div className={styles.list}>
                    {notificationsOld.map((notification) => (
                      <Notification
                        className={styles.notification}
                        key={notification.id}
                        viewState={notification.viewState}
                        exchangeStatus={notification.exchangeStatus}
                        date={notification.date}
                        user={notification.user}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Dropdown>
    </button>
  );
};
