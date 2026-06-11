import styles from './ArrowIcon.module.scss'
import ArrowSvg from './Arrow.svg?react'

type Orientation = 'vertical' | 'horizontal'

type ArrowIconPrors = {
  isOpen?: boolean;
  orientation?: Orientation;
  className? :string;
}

export const ArrowIcon = ({isOpen = false, orientation = 'horizontal', className}: ArrowIconPrors) => {
  return(
    <ArrowSvg className={`${styles.arrow} ${styles[orientation]} ${isOpen ? styles.open: ''} ${className}`}/>
  )
}
