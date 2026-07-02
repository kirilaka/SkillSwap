import { useState, useCallback } from 'react';
import clsx from 'clsx';
import { NotificationIcon } from '@/shared/ui/Icons/NotificationIcon/NotificationIcon';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { Box } from '@/shared/ui/Box/Box';
import { useAppSelector } from '@/store/hooks';
import { selectRequestNotifications } from '@/features/requests/model/requestsSlice';
import { Notification } from '../Notification/Notification';
import type { NotificationProps } from '../Notification/Notification';
import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
  hasNew?: boolean;
  notificationsNew?: NotificationProps[] | null;
  notificationsOld?: NotificationProps[] | null;
  className?: string;
}

export const NotificationButton = ({
  hasNew: hasNewProp,
  notificationsNew: notificationsNewProp,
  notificationsOld: notificationsOldProp,
  className,
}: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const notificationsFromStore = useAppSelector(selectRequestNotifications);

  const notificationsNew = notificationsNewProp ?? notificationsFromStore.filter((n) => n.isNew);
  const notificationsOld = notificationsOldProp ?? notificationsFromStore.filter((n) => !n.isNew);
  const hasNew = hasNewProp ?? notificationsNew.length > 0;

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleNotificationClick = (requestId?: string) => {
    if (requestId) console.log('Navigate to profile, requestId:', requestId);
    setIsOpen(false);
  };

  const hasNotifications = notificationsNew.length > 0 || notificationsOld.length > 0;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={clsx(styles.button, className)}
        onClick={handleClick}
        aria-label="Уведомления"
      >
        <NotificationIcon hasNew={hasNew} className={styles.icon} />
      </button>
      <Dropdown isOpen={isOpen} onClose={handleClose} className={styles.dropdown}>
        {/* Доделать кнопку 'Прочитать всё' */}
        <Box className={styles.box}>
          {!hasNotifications ? (
            <h2 className={styles.empty}>Тут пока что пусто</h2>
          ) : (
            <div className={styles.dropdownContent}>
              {notificationsNew.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Новые уведомления</h2>
                  <div className={styles.list}>
                    {notificationsNew.map((n) => (
                      <Notification
                        key={n.id}
                        {...n}
                        onClick={() => handleNotificationClick(n.requestId)}
                      />
                    ))}
                  </div>
                </div>
              )}
              {notificationsOld.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Просмотренные</h2>
                  <div className={styles.list}>
                    {notificationsOld.map((n) => (
                      <Notification
                        key={n.id}
                        {...n}
                        onClick={() => handleNotificationClick(n.requestId)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Box>
      </Dropdown>
    </div>
  );
};
