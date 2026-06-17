import { Button } from '@/shared/ui/Button/Button';
import styles from './LogInButton.module.scss';

export interface LogInButtonProps {
  /** Обработчик клика */
  onClick: () => void;
  /** Доп. классы */
  className?: string;
}

/** Кнопка входа пользователя */
export const LogInButton = ({ onClick, className = '' }: LogInButtonProps) => {
  return (
    <Button
      label="Войти"
      buttonType="secondary"
      onClick={onClick}
      className={`${styles.logInButton} ${className}`}
    />
  );
};
