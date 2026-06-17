import { Button } from '@/shared/ui/Button/Button';
import styles from './SignUpButton.module.scss';

export interface SignUpButtonProps {
  /** Обработчик клика */
  onClick: () => void;
  /** Доп. классы */
  className?: string;
}

/** Кнопка регистрации пользователя */
export const SignUpButton = ({ onClick, className = '' }: SignUpButtonProps) => {
  return (
    <Button
      label="Зарегистрироваться"
      buttonType="primary"
      onClick={onClick}
      className={`${styles.signUpButton} ${className}`}
    />
  );
};
