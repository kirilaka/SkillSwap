import { Link } from 'react-router-dom'
import { FC } from 'react'
import logoSvg from '@/assets/icons/logo.svg'
import styles from './Logo.module.scss'

interface LogoProps {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={`${className}`} aria-label="SkillSwap - на главную">
      <img src={logoSvg} alt="SkillSwap логотип" className={styles.icon} />
      <span className={styles.text}>SkillSwap</span>
    </Link>
  )
}
