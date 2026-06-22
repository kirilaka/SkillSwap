import { useCallback, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { ThemeToggle } from '@/features/theme/ui/ThemeToggle/ThemeToggle';
import { FavoriteButton } from '@/features/favorite/ui/FavoriteButton/FavoriteButton';
import { NotificationButton } from '@/features/notification/ui/NotificationButton/NotificationButton';
import { LogInButton } from '@/features/auth/ui/LogInButton/LogInButton';
import { SignUpButton } from '@/features/auth/ui/SignUpButton/SignUpButton';
import { UserAvatar } from '@/entities/user/ui/UserAvatar/UserAvatar';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { Box } from '@/shared/ui/Box/Box';
import { getAuthUser, clearAuthUser } from '@/features/auth/model/authUtils';
import type { UserInfo } from '@/shared/types';
import styles from './HeaderActions.module.scss';

export interface HeaderActionsProps {
  colorScheme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onFavoriteClick?: () => void;
  hasNewNotifications?: boolean;
  notificationsNew?: Parameters<typeof NotificationButton>[0]['notificationsNew'];
  notificationsOld?: Parameters<typeof NotificationButton>[0]['notificationsOld'];
  user?: UserInfo | null;
  className?: string;
}

export const HeaderActions = ({
  colorScheme = 'light',
  onThemeToggle,
  onFavoriteClick,
  hasNewNotifications = false,
  notificationsNew = null,
  notificationsOld = null,
  user,
  className,
}: HeaderActionsProps) => {
  const authUser = user ?? getAuthUser();
  const isAuth = !!authUser;

  const userInfo: UserInfo | undefined = authUser
    ? {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        avatarUrl: null,
        createdAt: '',
      }
    : undefined;

  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileOpen((prev) => !prev);
  }, []);

  const handleProfileClose = useCallback(() => {
    setIsProfileOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    clearAuthUser();
    setIsProfileOpen(false);
    navigate('/');
  }, [navigate]);

  const handleLogIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleSignUp = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <div className={clsx(styles.headerActions, className)}>
      <div className={styles.iconsSection}>
        <ThemeToggle colorScheme={colorScheme} onClick={onThemeToggle ?? (() => {})} />
        {isAuth && (
          <>
            <NotificationButton
              hasNew={hasNewNotifications}
              notificationsNew={notificationsNew}
              notificationsOld={notificationsOld}
            />
            <FavoriteButton onClick={onFavoriteClick} />
          </>
        )}
      </div>

      <div className={styles.authSection}>
        {!isAuth ? (
          <>
            <LogInButton onClick={handleLogIn} />
            <SignUpButton onClick={handleSignUp} />
          </>
        ) : (
          <div className={styles.profileWrapper} ref={profileRef}>
            <div onClick={handleProfileClick}>
              <UserAvatar user={userInfo} infoFormat="name" />
            </div>
            <Dropdown
              isOpen={isProfileOpen}
              onClose={handleProfileClose}
              className={styles.dropdown}
            >
              <Box className={styles.dropdownBox}>
                <Link to="/profile" className={styles.dropdownItem} onClick={handleProfileClose}>
                  Личный кабинет
                </Link>
                <button
                  type="button"
                  className={clsx(styles.dropdownItem, styles.logoutButton)}
                  onClick={handleLogout}
                >
                  <span>Выйти из аккаунта</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.logoutIcon}
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </Box>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};
