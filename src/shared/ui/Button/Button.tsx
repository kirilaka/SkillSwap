import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Содержимое кнопки */
  children?: ReactNode;
  /** Вид кнопки */
  buttonType?: 'primary' | 'secondary' | 'tertiary';
}
/** Кастомный компонент кнопки.
 * Принимает пропсы children, buttonType, и все остальные пропсы для кнопки.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, type = 'button', buttonType = 'secondary', className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={clsx(styles.button, styles[buttonType], className)}
      {...props}
    >
      {children}
    </button>
  );
});
