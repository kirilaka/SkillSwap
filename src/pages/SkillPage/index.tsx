import { UserCard } from '@/entities/user/ui/UserCard/UserCard';
import { SkillCard } from '@/entities/skill/ui/SkillCard/SkillCard';
import { SectionCards } from '@/widgets/MainSection/SectionCards/SectionCards';
import { useLocation, useParams } from 'react-router-dom';
import {
  fetchSkillByIdThunk,
  selectCurrentSkill,
  selectSkills,
} from '@/entities/skill/model/skillsSlice';
import { useEffect, useMemo } from 'react';
import { selectUsers } from '@/entities/user/model/usersSlice';
import styles from './SkillPage.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
export default function SkillPage() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { id: skillId } = useParams<{ id: string }>();

  useEffect(() => {
    if (skillId) {
      dispatch(fetchSkillByIdThunk(skillId));
    }
  }, [skillId, dispatch]);
  const user = location.state?.user ?? null;
  const currentSkill = useAppSelector(selectCurrentSkill);
  const users = useAppSelector(selectUsers);
  const skills = useAppSelector(selectSkills);
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
      return filteredSkills.includes(u.id) && u.id !== user?.id;
    });
  }, [users, user, currentSkill, skills]);
  return (
    <div className={styles.pageContainer}>
      <UserCard className={styles.userArea} hasDescription={true} user={user} skills={skills} />

      {currentSkill ? <SkillCard className={styles.skillArea} skill={currentSkill} /> : null}

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
