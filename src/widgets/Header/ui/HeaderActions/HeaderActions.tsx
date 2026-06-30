import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAuthUser, selectIsAuth, logout } from '@/features/auth/model/authSlice';
import { ThemeToggle } from '@/features/theme/ui/ThemeToggle/ThemeToggle';
import { FavoriteButton } from '@/features/favorite/ui/FavoriteButton/FavoriteButton';
import { NotificationButton } from '@/features/notification/ui/NotificationButton/NotificationButton';
import { LogInButton } from '@/features/auth/ui/LogInButton/LogInButton';
import { SignUpButton } from '@/features/auth/ui/SignUpButton/SignUpButton';
import { UserAvatar } from '@/entities/user/ui/UserAvatar/UserAvatar';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { Box } from '@/shared/ui/Box/Box';
import { LogOutIcon } from '@/shared/ui/Icons/LogOutIcon/LogOutIcon';
import { ROUTES } from '@/shared/lib/constants';
import type { UserInfo } from '@/shared/types';
import styles from './HeaderActions.module.scss';

export interface HeaderActionsProps {
  colorScheme?: 'light' | 'dark';
  hasNewNotifications?: boolean;
  notificationsNew?: Parameters<typeof NotificationButton>[0]['notificationsNew'];
  notificationsOld?: Parameters<typeof NotificationButton>[0]['notificationsOld'];
  /** Только для Storybook/тестов */
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authUser = useAppSelector(selectAuthUser);
  const isAuth = useAppSelector(selectIsAuth);

  const currentUser = authUser ?? user ?? undefined;
  const isAuthenticated = isAuth || !!currentUser;

  const [colorSchemeIs, setColorSchemeIs] = useState(colorScheme);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileOpen((prev) => !prev);
  }, []);

  const handleProfileClose = useCallback(() => {
    setIsProfileOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setIsProfileOpen(false);
    navigate(ROUTES.HOME);
  }, [dispatch, navigate]);

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
    setColorSchemeIs((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={clsx(styles.headerActions, className)}>
      <div className={styles.iconsSection}>
        <ThemeToggle colorScheme={colorSchemeIs} onClick={onThemeToggle} />
        {isAuthenticated && (
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
        {!isAuthenticated ? (
          <>
            <LogInButton onClick={handleLogIn} />
            <SignUpButton onClick={handleSignUp} />
          </>
        ) : (
          <div className={styles.profileWrapper}>
            <button type="button" className={styles.avatarButton} onClick={handleProfileClick}>
              <UserAvatar user={currentUser} infoFormat="name" />
            </button>
            <Dropdown
              isOpen={isProfileOpen}
              onClose={handleProfileClose}
              className={styles.dropdown}
            >
              <Box className={styles.dropdownBox}>
                <Link
                  to={ROUTES.PROFILE}
                  className={styles.dropdownItem}
                  onClick={handleProfileClose}
                >
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
          </div>
        )}
      </div>
    </div>
  );
};
