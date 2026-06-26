import styles from './SectionCards.module.scss';
import { UserCard } from '@/entities/user/ui/UserCard/UserCard';
import { UserInfo } from '@/shared/types';
import { Button } from '@/shared/ui/Button/Button';
import { ChevronIcon } from '@/shared/ui/Icons/ChevronIcon/ChevronIcon';

interface SectionCardsProps {
  title: string;
  className?: string;
  users?: UserInfo[];
  variant?: 'all' | 'three';
}

export const SectionCards = ({
  title,
  className,
  users = [],
  variant = 'three',
}: SectionCardsProps) => {
  const displaydUsers = variant === 'three' ? users.slice(0, 3) : users;

  return (
    <section className={className}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <Button className={styles.seeAllButton} buttonType="tertiary">
          Смотреть все
          <ChevronIcon orientation="vertical" />
        </Button>
      </div>
      <div className={styles.cards}>
        {displaydUsers.map((user) => (
          <UserCard key={user.id} user={user} hasDescription={false} />
        ))}
      </div>
    </section>
  );
};
