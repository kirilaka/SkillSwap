import clsx from 'clsx'
import styles from './NavigationItem.module.scss'
import { ArrowIcon } from '@/shared/ui/ArrowIcon/ArrowIcon'

interface NavItemProps {
  /** текст пункта навигации */
  label: string
  /** состояние открытого/закрытого пункта */
  isOpen?: boolean
  /** активное состояние пункта */
  isActive?: boolean
  /** обработчик клика */
  onClick?: () => void
  /** наличие галочки у компонента ( По умолчанию false ) */
  hasArrow?: boolean
  /** Доп.классы */
  className?: string
}

export const NavItem = ({
  label,
  isOpen,
  isActive,
  onClick,
  hasArrow = false,
  className,
}: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        { [styles.active]: isActive },
        { [styles.isOpen]: isOpen },
        styles.navItem,
      )}
    >
      <span>{label}</span>
      {hasArrow && <ArrowIcon isOpen={isOpen} />}
    </button>
  )
}
