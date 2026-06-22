import { ControlChip } from '@/shared/ui/ControlChip/ControlChip';
import styles from './FooterNavigation.module.scss';
import clsx from 'clsx';

interface FooterNavigationProps {
  /**Доп.классы*/
  className?: string;
}

export const FooterNavigation = ({ className }: FooterNavigationProps) => {
  return (
    <nav className={clsx(className, styles.navigation)}>
      <ul className={styles.list}>
        <li>
          <ControlChip label="О проекте" />
        </li>
        <li>
          <ControlChip label="Все навыки" />
        </li>
        <li>
          <ControlChip label="Контакты" />
        </li>
        <li>
          <ControlChip label="Блог" />
        </li>
        <li>
          <ControlChip label="Политика конфиденциальности" />
        </li>
        <li>
          <ControlChip label="Пользовательское соглашение" />
        </li>
      </ul>
    </nav>
  );
};
