import styles from './UserCard.module.scss';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { LikeIcon } from '@/shared/ui/Icons/LikeIcon/LikeIcon';
import { Button } from '@/shared/ui/Button/Button';
import { UserInfo } from '@/shared/types';
import { SkillWrapper } from '@/entities/skill/ui/SkillWrapper/SkillWrapper';
import { Box } from '@/shared/ui/Box/Box';
import clsx from 'clsx';
interface UserCardProps {
  /** Пользователь для отображения */
  user: UserInfo | null;
  /** Отображение карточки со статусом или без */
  hasDescription?: boolean;
  /** Обработчик клика на кнопку */
  onButtonClick?: () => void;
  /** Обработчик клика на favorite */
  onFavoriteClick?: () => void;
  /** Доп. классы */
  className?: string;
}

export const UserCard = ({
  user,
  hasDescription,
  onButtonClick,
  onFavoriteClick,
  className,
}: UserCardProps) => {
  if (!user) {
    return null;
  }

  const teachSkills = user.skills?.filter((s) => s.type === 'teach') ?? [];
  const learnSkills = user.skills?.filter((s) => s.type === 'learn') ?? [];

  return (
    <Box
      className={clsx(
        className,
        styles.containerUserCard,
        hasDescription ? styles.withDescription : styles.withoutDescription,
      )}
    >
      <div className={styles.header}>
        <div className={styles.topRowIcon}>
          <UserAvatar user={user} infoFormat="all" />
          {!hasDescription && (
            <button onClick={onFavoriteClick}>
              <LikeIcon className={styles.likeIcon} />
            </button>
          )}
        </div>
        {hasDescription && <span className={styles.description}>{user.description}</span>}
      </div>
      <div className={styles.skills}>
        <div className={styles.skillGroup}>
          <h4>Может научить:</h4>
          <div className={styles.skillList}>
            {teachSkills.length === 0 ? (
              <div className={styles.emptySkills} />
            ) : (
              <>
                {teachSkills.slice(0, 2).map((skill) => (
                  <SkillWrapper
                    key={skill.id}
                    variant="text"
                    skillCategory={skill.category || 'more'}
                  >
                    {skill.title}
                  </SkillWrapper>
                ))}
                {teachSkills.length > 2 && (
                  <SkillWrapper variant="text" skillCategory="more">
                    +{teachSkills.length - 2}
                  </SkillWrapper>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.skillGroup}>
          <h4>Хочет научиться:</h4>
          <div className={styles.skillList}>
            {learnSkills.length === 0 ? (
              <div className={styles.emptySkills} />
            ) : (
              <>
                {learnSkills.slice(0, 2).map((skill) => (
                  <SkillWrapper
                    key={skill.id}
                    variant="text"
                    skillCategory={skill.category || 'more'}
                  >
                    {skill.title}
                  </SkillWrapper>
                ))}
                {learnSkills.length > 2 && (
                  <SkillWrapper variant="text" skillCategory="more">
                    +{learnSkills.length - 2}
                  </SkillWrapper>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {!hasDescription && (
        <Button onClick={onButtonClick} className={styles.buttonMore} buttonType="primary">
          Подробнее
        </Button>
      )}
    </Box>
  );
};
