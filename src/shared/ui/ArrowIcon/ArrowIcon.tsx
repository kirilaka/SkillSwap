import styles from './ArrowIcon.module.scss'
import ArrowSvg from './Arrow.svg?react'
import clsx from 'clsx'

type Orientation = 'vertical' | 'horizontal'

interface ArrowIconPrors {
  /** Состояние открыта/закрыта */
  isOpen?: boolean
  /** Ориентация, по умол. horizontal*/
  orientation?: Orientation
  /** Доп. классы */
  className?: string
}

export const ArrowIcon = ({
  isOpen = false,
  orientation = 'horizontal',
  className,
}: ArrowIconPrors) => {
  return (
    <ArrowSvg
      className={clsx(
        styles.arrow,
        styles[orientation],
        isOpen && styles[`${orientation}_open`],
        className,
      )}
    />
  )
}
