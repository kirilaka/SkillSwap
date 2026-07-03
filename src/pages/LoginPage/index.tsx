import { Step1_UserData } from '@/features/auth/ui/Step1_UserData/Step1_UserData';
import styles from './LoginPage.module.scss';
import { useAppDispatch } from '@/store/hooks';
import { loginThunk } from '@/features/auth/model/authSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleStep1Submit = async (data: LoginFormData) => {
    try {
      await dispatch(
        loginThunk({
          email: data.email,
          password: data.password,
        }),
      ).unwrap();

      navigate(ROUTES.PROFILE);
    } catch (error) {
      console.log('Ошибка входа:', error);
    }
  };

  return (
    <main className={styles.page}>
      <Step1_UserData onSubmit={handleStep1Submit} variant="login" />
    </main>
  );
}
