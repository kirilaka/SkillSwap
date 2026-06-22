import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
  useEffect,
} from 'react';
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
  /** Кастомная функция валидации. */
  validate?: (value: string) => string | null;
  /** Когда показывать ошибку: 'change' (при вводе), 'blur' (при потере фокуса), 'submit' (при отправке формы - дефолт как blur) */
  showErrorOn?: 'change' | 'blur' | 'submit';
  /** Стили для обертки инпута */
  className?: string;
}
const sanitizeValue = (value: string | undefined | null): string => {
  if (value == null) return '';
  let sanitized = String(value).replace(/<[^>]*>/g, '');
  sanitized = sanitized.replace(/[\u200B-\u200D\uFEFF]/g, '');
  return sanitized;
};

/** Кастомный компонент инпута.
 * Принимает пропсы - className: стили для обертки, iconPosition, icon, onChange и все пропсы html инпута */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    onChange,
    className,
    iconPosition = 'none',
    icon,
    validate,
    showErrorOn = 'blur',
    required,
    minLength,
    maxLength,
    pattern,
    value: propValue,
    ...props
  },
  ref,
) {
  const [localValue, setLocalValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const currentValue = propValue !== undefined ? String(propValue) : localValue;

  useEffect(() => {
    if (propValue !== undefined) {
      setLocalValue(String(propValue));
    }
  }, [propValue]);

  const validateValue = (val: string): string | null => {
    const trimmed = val.trim();

    if (required && !trimmed) {
      return 'Это поле обязательно для заполнения';
    }

    if (!trimmed) return null;

    if (minLength !== undefined && trimmed.length < minLength) {
      return `Минимальная длина: ${minLength} символов`;
    }

    if (maxLength !== undefined && trimmed.length > maxLength) {
      return `Максимальная длина: ${maxLength} символов`;
    }

    if (pattern) {
      const regex = new RegExp(`^${String(pattern)}$`);
      if (!regex.test(trimmed)) {
        return 'Некорректный формат';
      }
    }

    if (validate) {
      return validate(trimmed);
    }

    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeValue(e.target.value);

    if (propValue === undefined) {
      setLocalValue(sanitized);
    }

    if (onChange) {
      onChange({
        ...e,
        target: {
          ...e.target,
          value: sanitized,
        },
      } as ChangeEvent<HTMLInputElement>);
    }

    if (showErrorOn === 'change') {
      setError(validateValue(sanitized));
    } else {
      setError(null);
    }
  };

  const handleBlur = () => {
    if (showErrorOn === 'blur') {
      const sanitized = sanitizeValue(currentValue);
      setError(validateValue(sanitized));
    }
  };

  const hasError = error !== null;

  return (
    <div>
      <div
        className={clsx(
          styles.customInputWrapper,
          {
            [styles.customInputWrapperError]: hasError,
          },
          className,
        )}
      >
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          ref={ref}
          className={clsx(styles.customInputField, {
            [styles.customInputFieldWithIconLeft]: iconPosition === 'left',
            [styles.customInputFieldWithIconRight]: iconPosition === 'right',
          })}
          {...props}
          value={currentValue}
        />
        {icon}
      </div>
      {hasError && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
});
