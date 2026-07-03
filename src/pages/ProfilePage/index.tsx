import styles from './Profile.module.scss';
import { ProfileSidebar } from '@/widgets/Profile/ui/ProfileSidebar/ProfileSidebar';
import { ProfileContent } from '@/widgets/Profile/ui/ProfileContent/ProfileContent';
import { selectAuthUser } from '@/features/auth/model/authSlice';
import { useAppSelector } from '@/store/hooks';

export default function ProfilePage() {
  const user = useAppSelector(selectAuthUser);
  return (
    <main className={styles.container}>
      <ProfileSidebar className={styles.sidebar} />
      <ProfileContent user={user} className={styles.content} />
    </main>
  );
}
