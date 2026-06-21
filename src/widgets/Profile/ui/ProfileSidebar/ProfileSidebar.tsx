import { Box } from '@/shared/ui/Box/Box';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ProfileSidebar.module.scss';
import { MessageTextIcon } from '@/shared/ui/Icons/MessageTextIcon/MessageTextIcon';
import { RequestIcon } from '@/shared/ui/Icons/RequestIcon/RequestIcon';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon/LikeIcon';
import { IdeaIcon } from '@/shared/ui/Icons/IdeaIcon/IdeaIcon';
import { UserIcon } from '@/shared/ui/Icons/UserIcon/UserIcon';

interface ProfileSidebarProps {
  /** Дополнительные CSS-классы для внешней стилизации */
  className?: string;
}

interface SidebarItem {
  text: string;
  path: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
  { text: 'Заявки', path: '/profile/applications', Icon: RequestIcon },
  { text: 'Мои обмены', path: '/profile/my-swaps', Icon: MessageTextIcon },
  { text: 'Избранное', path: '/profile/favorites', Icon: LikeIcon },
  { text: 'Мои навыки', path: '/profile/my-skills', Icon: IdeaIcon },
  { text: 'Личные данные', path: '/profile/personal-info', Icon: UserIcon },
];

export const ProfileSidebar = ({ className }: ProfileSidebarProps) => {
  return (
    <Box className={clsx(styles.ProfileSidebar, className)}>
      <nav className={styles.navList}>
        {sidebarItems.map((item) => {
          const { Icon } = item;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => clsx(styles.link, { [styles.activeLink]: isActive })}
            >
              <Icon className={styles.icon} />
              <span>{item.text}</span>
            </NavLink>
          );
        })}
      </nav>
    </Box>
  );
};
