import clsx from 'clsx';
import styles from './Profile.module.scss';
import { ProfileSidebar } from '@/widgets/Profile/ui/ProfileSidebar/ProfileSidebar';
import { ProfileContent } from '@/widgets/Profile/ui/ProfileContent/ProfileContent';
import { getUser } from '@/entities/user/model/userSelectors';

type Props = {
  className?: string;
};

export const Profile: React.FC<Props> = ({ className }) => {
  const user = getUser();

  return (
    <div className={clsx(className, styles.container)}>
      <ProfileSidebar className={styles.sidebar} />
      <ProfileContent user={user} className={styles.content} />
    </div>
  );
};
