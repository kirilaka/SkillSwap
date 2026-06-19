import styles from './Notification.module.scss';
import clsx from 'clsx';
import { IdeaIcon } from '@/shared/ui/Icons/IdeaIcon/IdeaIcon';
import { Button } from '@/shared/ui/Button/Button';
import type { User } from '@/shared/types';

interface NotificationProps {
  /** Состояние: новое или просмотренное */
  viewState: 'new' | 'viewed';
  /** Состояние обмена: отправлен или завершён */
  exchangeStatus: 'sent' | 'completed';
  /** Обработчик клика */
  onClick?: () => void;
  /** Дата уведомления */
  date: Date;
  /** Пользователь */
  user: User | null;
  /** Доп. классы */
  className?: string;
}

const formatDate = (date: Date): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const dateOnly = new Date(date);
  dateOnly.setHours(0, 0, 0, 0);

  if (dateOnly.getTime() === today.getTime()) return 'сегодня';
  if (dateOnly.getTime() === yesterday.getTime()) return 'вчера';

  const day = dateOnly.getDate();
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return `${day} ${months[dateOnly.getMonth()]}`;
};

const getTitle = (user: User | null, exchangeStatus: 'sent' | 'completed'): string => {
  const name = user?.name ?? 'Пользователь';
  return exchangeStatus === 'completed'
    ? `${name} принял ваш обмен`
    : `${name} предлагает вам обмен`;
};

const getDescription = (exchangeStatus: 'sent' | 'completed'): string =>
  exchangeStatus === 'completed'
    ? 'Перейдите в профиль, чтобы обсудить детали'
    : 'Примите обмен, чтобы обсудить детали';

export const Notification = ({
  viewState,
  exchangeStatus,
  onClick,
  date,
  user,
  className,
}: NotificationProps) => (
  <div className={clsx(styles.notification, styles[viewState], className)}>
    <div className={styles.topRow}>
      <IdeaIcon className={styles.icon} />
      <div className={styles.content}>
        <p className={styles.title}>{getTitle(user, exchangeStatus)}</p>
        <p className={styles.description}>{getDescription(exchangeStatus)}</p>
      </div>
      <span className={styles.date}>{formatDate(date)}</span>
    </div>
    {viewState === 'new' && (
      <Button onClick={onClick} buttonType="primary" className={styles.button}>
        Перейти
      </Button>
    )}
  </div>
);
