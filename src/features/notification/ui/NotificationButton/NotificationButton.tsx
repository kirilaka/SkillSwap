import { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { NotificationIcon } from '@/shared/ui/Icons/NotificationIcon/NotificationIcon';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import styles from './NotificationButton.module.scss';
import { Notification, NotificationProps } from '../Notification/Notification';
import { Box } from '@/shared/ui/Box/Box';

interface NotificationButtonProps {
  hasNew?: boolean;
  notificationsNew?: NotificationProps[] | null;
  notificationsOld?: NotificationProps[] | null;
  className?: string;
}

export const NotificationButton = ({
  hasNew = false,
  notificationsNew = null,
  notificationsOld = null,
  className,
}: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const hasNotifications =
    (notificationsNew && notificationsNew.length > 0) ||
    (notificationsOld && notificationsOld.length > 0);

  return (
    <button
      type="button"
      className={clsx(styles.button, className)}
      onClick={handleClick}
      aria-label="Уведомления"
    >
      <NotificationIcon hasNew={hasNew} className={styles.icon} />
      <Dropdown isOpen={isOpen} onClose={handleClose} className={styles.dropdown}>
        <Box className={styles.box}>
          {!hasNotifications ? (
            <h2 className={styles.empty}>Тут пока что пусто</h2>
          ) : (
            <div className={styles.dropdownContent}>
              {notificationsNew && notificationsNew.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Новые уведомления</h2>
                  <div className={styles.list}>
                    {notificationsNew.map((notification) => (
                      <Notification key={notification.id} {...notification} />
                    ))}
                  </div>
                </div>
              )}
              {notificationsOld && notificationsOld.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Просмотренные</h2>
                  <div className={styles.list}>
                    {notificationsOld.map((notification) => (
                      <Notification key={notification.id} {...notification} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Box>
      </Dropdown>
    </button>
  );
};
