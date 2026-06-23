import clsx from 'clsx';
import { Logo } from '@/shared/ui/Logo/Logo';
import { HeaderNavigation } from '@/widgets/Header/ui/HeaderNavigation/HeaderNavigation';
import { SearchInput } from '../SearchInput/SearchInput';
import { HeaderActions } from '../HeaderActions';
import styles from './Header.module.scss';
interface HeaderProps {
  /**Доп классы */
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={clsx(styles.header, className)}>
      <Logo />
      <HeaderNavigation />
      <SearchInput className={styles.input} />
      <HeaderActions />
    </header>
  );
};
