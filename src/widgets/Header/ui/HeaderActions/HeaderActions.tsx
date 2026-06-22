import { useCallback, useState } from 'react';
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
import { ROUTES } from '@/shared/lib/constants';
import { LogOutIcon } from '@/shared/ui/Icons/LogOutIcon/LogOutIcon';

export interface HeaderActionsProps {
  colorScheme?: 'light' | 'dark';
  hasNewNotifications?: boolean;
  notificationsNew?: Parameters<typeof NotificationButton>[0]['notificationsNew'];
  notificationsOld?: Parameters<typeof NotificationButton>[0]['notificationsOld'];
  user?: UserInfo | null;
  className?: string;
}

export const HeaderActions = ({
  colorScheme = 'light',
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
    navigate(ROUTES.HOME);
  }, [navigate]);

  const handleLogIn = useCallback(() => {
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const handleSignUp = useCallback(() => {
    navigate(ROUTES.REGISTER);
  }, [navigate]);

  const onFavoriteClick = useCallback(() => {
    navigate(ROUTES.FAVORITES);
  }, [navigate]);

  const onThemeToggle = () => {
    if (colorScheme == 'light') colorScheme = 'dark';
    else colorScheme = 'light';
  };

  return (
    <div className={clsx(styles.headerActions, className)}>
      <div className={styles.iconsSection}>
        <ThemeToggle colorScheme={colorScheme} onClick={onThemeToggle} />
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
          <>
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
                  <h4>Выйти из аккаунта</h4>
                  <LogOutIcon />
                </button>
              </Box>
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
};
