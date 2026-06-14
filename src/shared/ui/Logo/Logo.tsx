import { Link } from 'react-router-dom'
import logoSvg from '@/assets/icons/logo.svg'
import styles from './Logo.module.scss'

interface LogoProps {
  /** Доп. классы */
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      to="/"
      className={`${styles.logo} ${className ?? ''}`}
      aria-label="SkillSwap - на главную"
    >
      <img src={logoSvg} alt="SkillSwap логотип" className={styles.icon} />
      <span className={styles.text}>SkillSwap</span>
    </Link>
  )
}
