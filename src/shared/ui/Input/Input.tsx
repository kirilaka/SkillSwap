import { ChangeEvent, ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './Input.module.scss'

interface InputProps {
  /** Текст-подсказка внутри поля ввода */
  placeholder?: string
  /** Обработчик изменения значения в инпуте */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  /** Дополнительные CSS-классы для внешней стилизации */
  className?: string
  /**
   * Позиция будущей иконки для настройки отступов.
   * 'none' — без иконки, 'left' — иконка будет слева, 'right' — справа.
   */
  iconPosition?: 'none' | 'left' | 'right'
  /** Декоративная иконка в инпуте */
  icon?: ReactNode
}

export const Input = ({
  placeholder = 'Искать навык',
  onChange,
  className,
  iconPosition = 'none',
  icon,
}: InputProps) => {
  return (
    <div
      className={clsx(
        styles.customInputWrapper,
        {
          [styles.customInputWrapperWithIconLeft]: iconPosition === 'left',
          [styles.customInputWrapperWithIconRight]: iconPosition === 'right',
        },
        className,
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className={styles.customInputField}
      />
      {icon && <div className={styles.inputIconContainer}>{icon}</div>}
    </div>
  )
}
