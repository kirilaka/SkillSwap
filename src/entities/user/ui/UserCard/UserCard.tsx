import styles from './UserCard.module.scss';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { Button } from '@/shared/ui/Button/Button';
import { UserInfo, Skill } from '@/shared/types';
import { SkillWrapper } from '@/entities/skill/ui/SkillWrapper/SkillWrapper';
import { Box } from '@/shared/ui/Box/Box';
import clsx from 'clsx';
import { FavoriteButton } from '@/features/favorite/ui/FavoriteButton';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants';

interface UserCardProps {
  /** Пользователь для отображения */
  user: UserInfo | null;
  /** Навыки пользователя. Если не переданы, используется user.skills */
  skills?: Skill[];
  /** Отображение карточки со статусом или без */
  hasDescription?: boolean;
  /** Состояние добавлен в избранное или нет */
  isFavorite?: boolean;
  /** Обработчик клика на кнопку */
  onButtonClick?: () => void;
  /** Обработчик клика на избранное */
  onFavoriteClick?: () => void;
  /** Доп. классы */
  className?: string;
}

export const UserCard = ({
  user,
  skills,
  hasDescription,
  isFavorite = false,
  onButtonClick,
  onFavoriteClick,
  className,
}: UserCardProps) => {
  const navigate = useNavigate();
  if (!user) {
    return null;
  }

  const userSkills = skills?.filter((s) => s.authorId === user?.id);

  const teachSkills = userSkills?.filter((s) => s.type === 'teach') ?? [];
  const learnSkills = userSkills?.filter((s) => s.type === 'learn') ?? [];

  const renderSkillList = (skillList: Skill[] | Skill) => {
    if (!skillList) {
      return <div className={styles.emptySkills} />;
    }
    return (
      <>
        {Array.isArray(skillList) &&
          skillList.slice(0, 2).map((skill) => (
            <SkillWrapper key={skill.id} variant="text" skillCategory={skill.category || 'more'}>
              {skill.title}
            </SkillWrapper>
          ))}
        {Array.isArray(skillList) && skillList.length > 2 && (
          <SkillWrapper variant="text" skillCategory="more">
            +{skillList.length - 2}
          </SkillWrapper>
        )}
        {!Array.isArray(skillList) && (
          <SkillWrapper
            className={styles.soloSkill}
            key={skillList.id}
            variant="text"
            skillCategory={skillList.category || 'more'}
          >
            {skillList.title}
          </SkillWrapper>
        )}
      </>
    );
  };

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
            <FavoriteButton
              isFavorite={isFavorite}
              onClick={() => {
                onFavoriteClick?.();
              }}
            />
          )}
        </div>
        {hasDescription && <span className={styles.description}>{user.description}</span>}
      </div>
      <div className={styles.skills}>
        <div className={styles.skillGroup}>
          <h4>Может научить:</h4>
          <div className={styles.skillList}>{renderSkillList(teachSkills[0])}</div>
        </div>
        <div className={styles.skillGroup}>
          <h4>Хочет научиться:</h4>
          <div className={styles.skillList}>{renderSkillList(learnSkills)}</div>
        </div>
      </div>
      {!hasDescription && (
        <Button
          onClick={() => {
            navigate(generatePath(ROUTES.SKILL, { id: teachSkills[0].id }), {
              state: { user: user },
            });
            onButtonClick?.();
          }}
          className={styles.buttonMore}
          buttonType="primary"
        >
          Подробнее
        </Button>
      )}
    </Box>
  );
};
