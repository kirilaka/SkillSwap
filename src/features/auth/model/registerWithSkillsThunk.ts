import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerThunk, type RegisterPayload } from './authSlice';
import { createSkillThunk } from '@/entities/skill/model/skillsSlice';
import type { UserInfo as User } from '@/shared/types';
import type { Skill } from '@/shared/types';

type SkillData = Omit<Skill, 'id' | 'createdAt' | 'source'>;

interface RegisterWithSkillsPayload {
  user: RegisterPayload;
  learnSkill: SkillData;
  teachSkill: SkillData;
}

export const registerWithSkillsThunk = createAsyncThunk<
  { user: User; token: string },
  RegisterWithSkillsPayload,
  { rejectValue: string }
>('auth/registerWithSkills', async (payload, { dispatch, rejectWithValue }) => {
  try {
    // 1. Регистрируем пользователя
    const authResult = await dispatch(registerThunk(payload.user)).unwrap();

    // 2. Создаём навык "хочу научиться"
    await dispatch(
      createSkillThunk({
        ...payload.learnSkill,
        type: 'learn',
        authorId: authResult.user.id,
      }),
    ).unwrap();

    // 3. Создаём навык "могу научить"
    await dispatch(
      createSkillThunk({
        ...payload.teachSkill,
        type: 'teach',
        authorId: authResult.user.id,
      }),
    ).unwrap();

    return authResult;
  } catch {
    return rejectWithValue('Ошибка при регистрации с навыками');
  }
});
