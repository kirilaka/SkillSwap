import { Button } from '@/shared/ui/Button/Button';
import styles from './SignUpButton.module.scss';
import clsx from 'clsx';

export interface SignUpButtonProps {
  /** Обработчик клика */
  onClick: () => void;
  /** Доп. классы */
  className?: string;
}

/** Кнопка регистрации пользователя */
export const SignUpButton = ({ onClick, className }: SignUpButtonProps) => {
  return (
    <Button buttonType="primary" onClick={onClick} className={clsx(styles.signUpButton, className)}>
      Зарегистрироваться
    </Button>
  );
};
