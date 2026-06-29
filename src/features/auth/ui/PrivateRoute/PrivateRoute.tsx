import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuth } from '../../model/authSlice';
import { ROUTES } from '@/shared/lib/constants';

export const PrivateRoute = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
