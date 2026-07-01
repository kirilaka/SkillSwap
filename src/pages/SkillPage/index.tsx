import { UserCard } from '@/entities/user/ui/UserCard/UserCard';
import { SkillCard } from '@/entities/skill/ui/SkillCard/SkillCard';
import { SectionCards } from '@/widgets/MainSection/SectionCards/SectionCards';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchSkillByIdThunk, selectCurrentSkill } from '@/entities/skill/model/skillsSlice';
import { useEffect, useMemo } from 'react';
import { selectUsers } from '@/entities/user/model/usersSlice';
import styles from './SkillPage.module.scss';
export default function SkillPage() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { id: skillId } = useParams<{ id: string }>();

  useEffect(() => {
    if (skillId) {
      dispatch(fetchSkillByIdThunk(skillId));
    }
  }, [skillId, dispatch]);
  const user = location.state?.user ?? null;
  const currentSkill = useSelector(selectCurrentSkill);
  const users = useSelector(selectUsers);
  const filteredUsers = useMemo(() => {
    if (!currentSkill || !users) return [];

    return users.filter((u) => {
      //Исключаем самого автора текущего навыка
      if (user && u.id === user.id) return false;

      return u.skills?.some((skill) => skill.id === currentSkill.id && skill.type === 'teach');
    });
  }, [users, currentSkill, user]);
  return (
    <div className={styles.pageContainer}>
      <UserCard className={styles.userArea} hasDescription={true} user={user} />

      {currentSkill ? <SkillCard className={styles.skillArea} skill={currentSkill} /> : null}

      <SectionCards
        className={styles.sectionsArea}
        title={'Похожие предложения'}
        users={filteredUsers}
        variant={'three'}
      />
    </div>
  );
}
