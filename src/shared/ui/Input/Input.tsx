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
  /** Имя инпута */
  inputName?: string
  /** id инпута */
  inputId?: string
  /**
   * Позиция будущей иконки для настройки отступов.
   * 'none' — без иконки, 'left' — иконка будет слева, 'right' — справа.
   */
  iconPosition?: 'none' | 'left' | 'right'
  /** Декоративная иконка в инпуте */
  icon?: ReactNode
}

export const Input = ({
  placeholder = 'Поле ввода',
  onChange,
  className,
  inputName = '',
  inputId = '',
  iconPosition = 'none',
  icon,
}: InputProps) => {
  return (
    <div className={clsx(styles.customInputWrapper, className)}>
      <input
        type="text"
        name={inputName}
        id={inputId}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(styles.customInputField, {
          [styles.customInputFieldWithIconLeft]: iconPosition === 'left',
          [styles.customInputFieldWithIconRight]: iconPosition === 'right',
        })}
      />
      {icon}
    </div>
  )
}
