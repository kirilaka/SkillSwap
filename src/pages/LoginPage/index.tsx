import { Step1_UserData } from '@/features/auth/ui/Step1_UserData/Step1_UserData';
import styles from './LoginPage.module.scss';
import { useAppDispatch } from '@/store/hooks';
import { loginThunk } from '@/features/auth/model/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state.from;

  const handleStep1Submit = async (data: LoginFormData) => {
    try {
      await dispatch(
        loginThunk({
          email: data.email,
          password: data.password,
        }),
      ).unwrap();

      navigate(from);
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
