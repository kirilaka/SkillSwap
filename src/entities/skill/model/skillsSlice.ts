import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchSkills, fetchSkillById } from '@/api/skills';
import type { Skill } from '@/shared/types';

interface SkillsState {
  items: Skill[];
  currentSkill: Skill | undefined;
  isLoading: boolean;
  error: string | null;
}

const initialState: SkillsState = {
  items: [],
  currentSkill: undefined,
  isLoading: false,
  error: null,
};

export const fetchSkillsThunk = createAsyncThunk<Skill[], void, { rejectValue: string }>(
  'skills/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSkills();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  },
);

export const fetchSkillByIdThunk = createAsyncThunk<Skill, string, { rejectValue: string }>(
  'skills/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const skill = await fetchSkillById(id);
      if (!skill) {
        throw new Error(`Skill with id ${id} not found`);
      }
      return skill;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  },
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearSkillsError: (state) => {
      state.error = null;
    },
    clearCurrentSkill: (state) => {
      state.currentSkill = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSkillsThunk.fulfilled, (state, action: PayloadAction<Skill[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchSkillsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to fetch skills';
      })
      .addCase(fetchSkillByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSkillByIdThunk.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.isLoading = false;
        state.currentSkill = action.payload;
      })
      .addCase(fetchSkillByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to fetch skill';
      });
  },
});

export const { clearSkillsError, clearCurrentSkill } = skillsSlice.actions;

export const selectSkills = (state: { skills: SkillsState }) => state.skills.items;
export const selectCurrentSkill = (state: { skills: SkillsState }) => state.skills.currentSkill;
export const selectSkillsLoading = (state: { skills: SkillsState }) => state.skills.isLoading;
export const selectSkillsError = (state: { skills: SkillsState }) => state.skills.error;

export default skillsSlice.reducer;
