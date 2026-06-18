import { User } from '@/shared/types';
import styles from './UserAvatar.module.scss';
import clsx from 'clsx';
import { Avatar } from '@/shared/ui/Avatar/Avatar';

interface UserInfo extends User {
  city?: string;
  age?: number;
}

interface UserAvatarProps {
  /** Пользователь для отображения */
  user?: UserInfo;
  /** Формат отображения информации о пользователе. По умолчанию 'name' */
  infoFormat?: 'name' | 'all';
  /** Обработчик клика на UserAvatar. */
  onClick?: () => void;
  /** Доп. классы для стилизации. */
  className?: string;
}

const getAgeLabel = (age: number): string => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return ' лет';
  if (lastDigit === 1) return 'год';
  if (lastDigit >= 2 && lastDigit <= 4) return ' года';
  return ' лет';
};

export const UserAvatar = ({ user, infoFormat = 'name', onClick, className }: UserAvatarProps) => {
  if (!user) {
    return null;
  }
  return (
    <div className={clsx(styles.userAvatar, styles[infoFormat], className)} onClick={onClick}>
      <Avatar src={user.avatarUrl || undefined} alt={user.name} className={styles.avatar} />
      <div className={styles.info}>
        <span className={styles.nameTitle}>{user.name}</span>
        {infoFormat === 'all' && (
          <span className={styles.details}>
            {user.city && user.age
              ? `${user.city}, ` + `${user.age} ${getAgeLabel(user.age)}`
              : user.city
                ? user.city
                : user.age
                  ? `${user.age} ${getAgeLabel(user.age)}`
                  : ''}
          </span>
        )}
      </div>
    </div>
  );
};
