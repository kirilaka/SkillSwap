import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Обработчик изменения значения в инпуте */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Позиция будущей иконки для настройки отступов.
   * 'none' — без иконки, 'left' — иконка будет слева, 'right' — справа.
   */
  iconPosition?: 'none' | 'left' | 'right';
  /** Декоративная иконка в инпуте */
  icon?: ReactNode;
  /** Стили для обертки инпута */
  className?: string;
}
/** Кастомный компонент инпута.
 * Принимает пропсы - className: стили для обертки, iconPosition, icon, onChange и все пропсы html инпута */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { onChange, className, iconPosition = 'none', icon, ...props },
  ref,
) {
  return (
    <div className={clsx(styles.customInputWrapper, className)}>
      <input
        onChange={onChange}
        ref={ref}
        className={clsx(styles.customInputField, {
          [styles.customInputFieldWithIconLeft]: iconPosition === 'left',
          [styles.customInputFieldWithIconRight]: iconPosition === 'right',
        })}
        {...props}
      />
      {icon}
    </div>
  );
});
