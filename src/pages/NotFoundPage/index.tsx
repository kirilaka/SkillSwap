import { ErrorDisplay } from '@/shared/ui/ErrorDisplay';
import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <main className={styles.page}>
      <ErrorDisplay
        onSendButtonClick={() => console.log('Отправлен отчёт об ошибке')}
        onClick={() => {
          navigate(ROUTES.HOME);
        }}
      />
    </main>
  );
}
