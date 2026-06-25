import clsx from 'clsx';
import styles from './Profile.module.scss';
import { ProfileSidebar } from '@/widgets/Profile/ui/ProfileSidebar/ProfileSidebar';
import { ProfileContent } from '@/widgets/Profile/ui/ProfileContent/ProfileContent';
import { getAuthUser } from '@/features/auth/model/authUtils';
import type { User } from '@/entities/user/model/types';

type Props = {
  className?: string;
};

export const Profile: React.FC<Props> = ({ className }) => {
  const authUser = getAuthUser();

  const user: User | null = authUser
    ? {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        avatarUrl: null,
        createdAt: new Date().toISOString(),
      }
    : null;

  return (
    <div className={clsx(className, styles.container)}>
      <ProfileSidebar className={styles.sidebar} />
      <ProfileContent user={user} className={styles.content} />
    </div>
  );
};
