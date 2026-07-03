import { UserCard } from '@/entities/user/ui/UserCard/UserCard';
import { SkillCard } from '@/entities/skill/ui/SkillCard/SkillCard';
import { SectionCards } from '@/widgets/MainSection/SectionCards/SectionCards';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  fetchSkillByIdThunk,
  selectCurrentSkill,
  selectSkills,
} from '@/entities/skill/model/skillsSlice';
import { useEffect, useMemo } from 'react';
import { selectUsers } from '@/entities/user/model/usersSlice';
import styles from './SkillPage.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFavoriteUserIds, toggleFavoriteUser } from '@/features/favorite/model/favoriteSlice';
import { selectAuthUser } from '@/features/auth/model/authSlice';
import { createRequest } from '@/features/requests/model/requestsSlice';
import { ROUTES } from '@/shared/lib/constants';

export default function SkillPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: skillId } = useParams<{ id: string }>();

  useEffect(() => {
    if (skillId) {
      dispatch(fetchSkillByIdThunk(skillId));
    }
  }, [skillId, dispatch]);

  const currentSkill = useAppSelector(selectCurrentSkill);
  const users = useAppSelector(selectUsers);
  const skills = useAppSelector(selectSkills);
  const stateUser = location.state?.user ?? null;

  const author = useMemo(() => {
    if (stateUser) return stateUser;
    if (!currentSkill) return null;

    return users.find((user) => user.id === currentSkill.authorId) ?? null;
  }, [stateUser, currentSkill, users]);

  const filteredUsers = useMemo(() => {
    if (!currentSkill || !users) return [];

    return users.filter((u) => {
      const filteredSkills = skills
        .filter(
          (s) =>
            s.title.toLowerCase() == currentSkill.title.toLowerCase() &&
            s.type === currentSkill.type,
        )
        .map((s) => {
          return s.authorId;
        });
      return filteredSkills.includes(u.id) && u.id !== author?.id;
    });
  }, [users, author, currentSkill, skills]);

  // ==========================================
  // ЛОГИКА ДЛЯ ВЗАИМОДЕЙСТВИЯ С ИЗБРАННЫМ (FAVORITES)
  // ==========================================

  // Получаем список ID всех пользователей, добавленных в избранное
  const favoriteUserIds = useAppSelector(selectFavoriteUserIds);

  /**
   * Переключение статуса избранного для автора текущего навыка.
   * Связывает UI-компонент SkillCard с фичей favoriteSlice.
   */
  const handleFavoriteClick = () => {
    if (author?.id) {
      dispatch(toggleFavoriteUser(author.id));
    }
  };

  /** Проверка: находится ли автор просматриваемого навыка в избранном */
  const isSkillAuthorFavorite = author ? favoriteUserIds.includes(author.id) : false;

  // ==========================================
  // ЛОГИКА ДЛЯ ЗАЯВОК НА ОБМЕН (REQUESTS)
  // ==========================================

  // Данные текущего авторизованного пользователя (инициатор обмена)
  const authUser = useAppSelector(selectAuthUser);

  /**
   * Отправка запроса на обмен текущим навыком.
   */
  const handleSendOfferClick = () => {
    // Для создания заявки обязательны: сам навык, его владелец и авторизованный отправитель
    if (!currentSkill || !author) return;
    if (!authUser) {
      console.log(location);
      return navigate(ROUTES.LOGIN, {
        state: { from: location },
      });
    }
    dispatch(
      createRequest({
        skillId: currentSkill.id, // Навык, на который откликнулись
        fromUserId: authUser.id, // Кто предлагает обмен (текущий сессионный юзер)
        toUserId: author.id, // Кому предлагается обмен (автор навыка из router state)
      }),
    );
  };

  /**
   * Условия блокировки кнопки "Предложить обмен":
   * 1. Нет данных о навыке или его авторе.
   * 2. Пользователь не авторизован в системе.
   * 3. Пользователь открыл страницу своего собственного навыка (обмен с самим собой запрещен).
   */
  const isOfferDisabled = !currentSkill || !author || authUser?.id === author.id;

  return (
    <div className={styles.pageContainer}>
      <UserCard className={styles.userArea} hasDescription={true} user={author} skills={skills} />

      {currentSkill ? (
        <SkillCard
          className={styles.skillArea}
          skill={currentSkill}
          isFavorite={isSkillAuthorFavorite}
          // Если данных об авторе нет, кнопка избранного не сработает
          onFavoriteClick={author ? handleFavoriteClick : undefined}
          // Если обмен недоступен/запрещен, передаем undefined для автоматического выключения кнопки внутри SkillCard
          onSendOfferButtonClick={isOfferDisabled ? undefined : handleSendOfferClick}
        />
      ) : null}

      <SectionCards
        className={styles.sectionsArea}
        title={'Похожие предложения'}
        users={filteredUsers}
        skills={skills}
        variant="scrollFour"
      />
    </div>
  );
}
