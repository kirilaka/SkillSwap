import styles from './SectionCards.module.scss';
import { UserCard } from '@/entities/user/ui/UserCard/UserCard';
import { selectFavoriteUserIds, toggleFavoriteUser } from '@/features/favorite/model/favoriteSlice';
import { Skill, UserInfo } from '@/shared/types';
import { Button } from '@/shared/ui/Button/Button';
import { Gallery } from '@/shared/ui/Gallery/Gallery';
import { ChevronIcon } from '@/shared/ui/Icons/ChevronIcon/ChevronIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface SectionCardsProps {
  title: string;
  className?: string;
  users?: UserInfo[];
  variant?: 'all' | 'three' | 'scrollFour';
  onClick?: () => void;
  skills?: Skill[];
  /** Обработчик клика на избранное */
  onFavoriteClick?: () => void;
}

export const SectionCards = ({
  title,
  className,
  users = [],
  variant = 'three',
  onClick,
  skills = [],
  onFavoriteClick,
}: SectionCardsProps) => {
  const dispatch = useAppDispatch();
  const displaydUsers = variant === 'three' ? users.slice(0, 3) : users;

  const showButton = variant === 'three';
  // Получаем список ID всех пользователей, добавленных в избранное
  const favoriteUserIds = useAppSelector(selectFavoriteUserIds);

  return (
    <section className={className}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {showButton && (
          <Button className={styles.seeAllButton} buttonType="tertiary" onClick={onClick}>
            Смотреть все
            <ChevronIcon orientation="vertical" />
          </Button>
        )}
      </div>
      {variant !== 'scrollFour' && (
        <div className={styles.cards}>
          {displaydUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              hasDescription={false}
              skills={skills}
              isFavorite={user ? favoriteUserIds.includes(user.id) : false}
              onFavoriteClick={() => {
                if (user?.id) {
                  dispatch(toggleFavoriteUser(user.id));
                }
                onFavoriteClick?.();
              }}
            />
          ))}
        </div>
      )}
      {variant === 'scrollFour' && (
        <Gallery variant="4">
          {displaydUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              hasDescription={false}
              skills={skills}
              isFavorite={user ? favoriteUserIds.includes(user.id) : false}
              onFavoriteClick={() => {
                if (user?.id) {
                  dispatch(toggleFavoriteUser(user.id));
                }
                onFavoriteClick?.();
              }}
            />
          ))}
        </Gallery>
      )}
    </section>
  );
};
