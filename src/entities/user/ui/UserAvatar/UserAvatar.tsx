import { User } from '@/shared/types';
import styles from './UserAvatar.module.scss';
import clsx from 'clsx';
import { Avatar } from '@/shared/ui/Avatar/Avatar';

interface UserInfo extends User {
  city?: string;
  age?: number;
}

interface UserAvatarProps {
  user: UserInfo;
  infoFormat: 'name' | 'all';
  onClick: () => void;
  className?: string;
}

const getAgeLabel = (age: number): string => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'лет';
  if (lastDigit === 1) return 'год';
  if (lastDigit >= 2 && lastDigit <= 4) return 'года';
  return 'лет';
};

export const UserAvatar = ({ user, infoFormat, onClick, className }: UserAvatarProps) => {
  return (
    <div className={clsx(styles['user-avatar'], styles[infoFormat], className)} onClick={onClick}>
      <Avatar src={user.avatarUrl || undefined} alt={user.name} className={styles['avatar-img']} />
      <div className={styles.info}>
        <span className={styles['name-text']}>{user.name}</span>
        {infoFormat === 'all' && user.city && (
          <span className={styles.details}>
            {user.city}
            {user.age ? `, ${user.age} ${getAgeLabel(user.age)}` : ''}
          </span>
        )}
      </div>
    </div>
  );
};
