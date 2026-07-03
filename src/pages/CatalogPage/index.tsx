import { FilterPanel } from '@/features/filtration/ui/FilterPanel';
import styles from './CatalogPage.module.scss';
import { SectionCards } from '@/widgets/MainSection/SectionCards/SectionCards';
import { useAppSelector } from '@/store/hooks';
import { selectUsers } from '@/entities/user/model/usersSlice';
import { selectSkills } from '@/entities/skill/model/skillsSlice';
import { useMemo } from 'react';
import {
  selectCity,
  selectExchangeType,
  selectFilteredSkills,
  selectGender,
  selectSearchValue,
  selectSelectedCategoryIds,
  selectSelectedSubcategoryIds,
} from '@/features/filtration/models/filtrationSlice';
import { UserInfo } from '@/shared/types';

export default function CatalogPage() {
  const selectedCategoryIds = useAppSelector(selectSelectedCategoryIds);
  const selectedSubcategoryIds = useAppSelector(selectSelectedSubcategoryIds);
  const exchangeType = useAppSelector(selectExchangeType);
  const gender = useAppSelector(selectGender);
  const city = useAppSelector(selectCity);
  const searchValue = useAppSelector(selectSearchValue);

  const hasActiveFilters =
    selectedCategoryIds.length > 0 ||
    selectedSubcategoryIds.length > 0 ||
    exchangeType !== 'all' ||
    gender !== 'any' ||
    city !== '' ||
    searchValue.trim() !== '';

  const users = useAppSelector(selectUsers);
  const skills = useAppSelector(selectSkills);
  const filteredCards = useAppSelector(selectFilteredSkills);

  const filteredUsers = useMemo(() => {
    const usersById = new Map(users.map((user) => [user.id, user]));

    return filteredCards
      .map((skill) => usersById.get(skill.authorId))
      .filter((user): user is UserInfo => Boolean(user))
      .filter((user, index, array) => {
        return array.findIndex((item) => item.id === user.id) === index;
      });
  }, [users, filteredCards]);

  return (
    <main className={styles.page}>
      <FilterPanel className={styles.filterPanel} />
      {!hasActiveFilters && (
        <section className={styles.content}>
          <SectionCards
            title="Популярное"
            className={styles.sectionCards}
            variant="three"
            // Временное решение, так как нет счетчика лайков
            users={users}
            skills={skills}
          />
          <SectionCards
            title="Новое"
            className={styles.sectionCards}
            variant="three"
            users={users}
            skills={skills}
          />

          <SectionCards
            title="Рекомендуем"
            className={styles.sectionCards}
            variant="all"
            users={users}
            skills={skills}
          />
        </section>
      )}
      {hasActiveFilters && (
        <section className={styles.content}>
          <SectionCards
            title={`Подходящие предложения: ${filteredUsers.length}`}
            className={styles.sectionCards}
            variant="all"
            users={filteredUsers}
            skills={filteredCards}
          />
        </section>
      )}
    </main>
  );
}
