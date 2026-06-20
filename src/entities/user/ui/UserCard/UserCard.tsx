import styles from './UserCard.module.scss';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon/LikeIcon';
import { Button } from '@/shared/ui/Button/Button';
import { UserInfo } from '@/shared/types';
import { SkillWrapper } from '@/entities/skill/ui/SkillWrapper/SkillWrapper';
import clsx from 'clsx';
interface UserCardProps {
  /** Пользователь для отображения */
  user: UserInfo | null;
  /** Отображение карточки со статусом или без */
  hasStatus?: boolean;
  /** Обработчик клика на кнопку */
  onButtonClick?: () => void;
  /** Обработчик клика на favorite */
  onFavoriteClick?: () => void;
  /** Доп. классы */
  className?: string;
}

export const UserCard = ({
  user,
  hasStatus,
  onButtonClick,
  onFavoriteClick,
  className,
}: UserCardProps) => {
  if (!user) {
    return null;
  }

  return (
    <div className={clsx(styles.containerUserCard, className)}>
      <div className={styles.topRowIcon}>
        <UserAvatar user={user} infoFormat="all" />
        {!hasStatus && (
          <button onClick={onFavoriteClick}>
            <LikeIcon className={styles.likeIcon} />
          </button>
        )}
      </div>
      {hasStatus && (
        <span className={styles.status}>
          Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое
        </span>
      )}
      <div className={styles.skills}>
        <p>Может научить:</p>
        <SkillWrapper variant="text" skillCategory="education">
          Английский язык{' '}
        </SkillWrapper>
        <p>Хочет научиться:</p>
        <SkillWrapper variant="text" skillCategory="education">
          Английский язык
        </SkillWrapper>
        <SkillWrapper variant="text" skillCategory="education">
          Танцевать
        </SkillWrapper>
        {!hasStatus && (
          <SkillWrapper variant="text" skillCategory="education">
            +2
          </SkillWrapper>
        )}
      </div>
      <Button onClick={onButtonClick} className={styles.buttonMore} buttonType="primary">
        Подробнее123
      </Button>
    </div>
  );
};
