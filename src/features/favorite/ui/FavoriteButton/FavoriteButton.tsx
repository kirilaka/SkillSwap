import { ButtonHTMLAttributes, forwardRef } from 'react';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon/LikeIcon';
import styles from './FavoriteButton.module.scss';
import clsx from 'clsx';

export interface FavoriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Состояние добавлен в избранное или нет */
  isFavorite?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
}

/** Кнопка добавления в избранное (toggle button) */
export const FavoriteButton = forwardRef<HTMLButtonElement, FavoriteButtonProps>(
  function FavoriteButton({ isFavorite = false, onClick, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isFavorite}
        className={clsx(styles.favoriteButton, className)}
        onClick={onClick}
        aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        {...props}
      >
        <LikeIcon
          className={clsx(
            styles.favoriteButtonIcon,
            isFavorite && styles.favoriteButtonIconIsActive,
          )}
        />
      </button>
    );
  },
);
