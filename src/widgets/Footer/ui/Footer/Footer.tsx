import { Logo } from '@/shared/ui/Logo/Logo';
import { FooterNavigation } from '../FooterNavigation/FooterNavigation';
import styles from './Footer.module.scss';
import clsx from 'clsx';
interface FooterProps {
  className?: string;
}
export const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={clsx(styles.footer, className)}>
      <section className={styles.content}>
        <div className={styles.brandZone}>
          <Logo />
          <span className={styles.copyright}>SkillSwap — {currentYear}</span>
        </div>
        <FooterNavigation className={styles.nav} />
      </section>
    </footer>
  );
};
