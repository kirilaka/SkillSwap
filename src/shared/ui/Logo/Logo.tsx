import { Link } from 'react-router-dom';
import logoSvg from '@/assets/icons/logo.svg';
import styles from './Logo.module.scss';
import clsx from 'clsx';

interface LogoProps {
  /** Доп. классы */
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      to="/"
      className={clsx(styles.logo, className)}
      aria-label="На главную страницу SkillSwap"
    >
      <img src={logoSvg} alt="Логотип SkillSwap" className={styles.icon} />
      <span className={styles.text}>SkillSwap</span>
    </Link>
  );
};
