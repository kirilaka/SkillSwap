import { Box } from '@/shared/ui/Box/Box';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ProfileSidebar.module.scss';
import { SidebarItems } from '../../model/SidebarItems';

interface ProfileSidebarProps {
  /** Дополнительные CSS-классы для внешней стилизации */
  className?: string;
}

export const ProfileSidebar = ({ className }: ProfileSidebarProps) => {
  return (
    <Box className={clsx(styles.ProfileSidebar, className)}>
      <nav className={styles.navList}>
        {SidebarItems.map((item) => {
          const { Icon } = item;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => clsx(styles.link, { [styles.activeLink]: isActive })}
            >
              {Icon && <Icon className={styles.icon} />}
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </Box>
  );
};
