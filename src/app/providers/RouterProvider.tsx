import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { ROUTES } from '@/shared/lib/constants';
import { PrivateRoute } from '@/features/auth/ui/PrivateRoute';
import { MainLayout } from '@/app/layouts';
import { AuthLayout } from '@/app/layouts';
import { useAppDispatch } from '@/store/hooks';
import { checkAuthThunk } from '@/features/auth/model/authSlice';
import { fetchUsersThunk } from '@/entities/user/model/usersSlice';
import { fetchSkillsThunk } from '@/entities/skill/model/skillsSlice';
const CatalogPage = lazy(() => import('@/pages/CatalogPage'));
const SkillPage = lazy(() => import('@/pages/SkillPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export function AppRouter() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersThunk());
    dispatch(fetchSkillsThunk());
    dispatch(checkAuthThunk());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<CatalogPage />} />
            <Route path={ROUTES.SKILL} element={<SkillPage />} />

            <Route element={<PrivateRoute />}>
              <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
              <Route
                path={ROUTES.PROFILE}
                element={<Navigate to={ROUTES.PROFILE_PERSONAL_INFO} replace />}
              />
              <Route path={ROUTES.PROFILE_PERSONAL_INFO} element={<ProfilePage />} />
              <Route path={ROUTES.CREATE} element={<CreateSkillPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
