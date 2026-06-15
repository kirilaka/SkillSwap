import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
  /** Надпись на кнопке */
  label: string;
  /** Обработчик клика */
  onClick?: () => void;
  /** Тип кнопки */
  type?: 'submit' | 'reset' | 'button';
  /** Вид кнопки */
  buttonType?: 'primary' | 'secondary' | 'tertiary';
  /** Доп. классы */
  className?: string;
  /** Состояние отключения кнопки */
  disabled?: boolean;
}

export const Button = ({
  label,
  onClick,
  type = 'button',
  buttonType = 'secondary',
  className,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.button, styles[buttonType], className)}
    >
      {label}
    </button>
  );
};
