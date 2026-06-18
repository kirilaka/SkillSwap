import { ButtonHTMLAttributes, forwardRef } from 'react';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon/LikeIcon';
import styles from './FavoriteButton.module.scss';

export interface FavoriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Состояние добавлен в избранное или нет */
  isFavorite?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
}

export const FavoriteButton = forwardRef<HTMLButtonElement, FavoriteButtonProps>(
  function FavoriteButton({ isFavorite = false, onClick, className = '', ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteButtonIsActive : ''} ${className}`}
        onClick={onClick}
        aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        aria-pressed={isFavorite}
        {...props}
      >
        <LikeIcon className={styles.favoriteButtonIcon} />
      </button>
    );
  },
);
