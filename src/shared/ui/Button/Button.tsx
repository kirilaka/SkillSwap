import styles from './Button.module.scss'
import clsx from 'clsx'

interface ButtonProps {
  label: string
  onClick: () => void
  type: 'submit' | 'reset' | 'button'
  fieldset: 'full' | 'partial' | 'none'
  className?: string
  disabled: boolean
}

export const Button = ({
  label,
  onClick,
  type = 'button',
  fieldset = 'partial',
  className,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.button, styles[fieldset], className)}
    >
      {label}
    </button>
  )
}
