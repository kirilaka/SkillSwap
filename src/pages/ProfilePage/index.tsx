import styles from './Profile.module.scss';
import { ProfileSidebar } from '@/widgets/Profile/ui/ProfileSidebar/ProfileSidebar';
import { ProfileContent } from '@/widgets/Profile/ui/ProfileContent/ProfileContent';
import { getUser } from '@/entities/user/model/userSelectors';

export default function ProfilePage() {
  const user = getUser();

  return (
    <main className={styles.container}>
      <ProfileSidebar className={styles.sidebar} />
      <ProfileContent user={user} className={styles.content} />
    </main>
  );
}
