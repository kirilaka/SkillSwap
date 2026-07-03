import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchSkills, fetchSkillById } from '@/api/skills';
import {
  getCreatedSkillsFromStorage,
  saveCreatedSkillsToStorage,
} from '@/shared/lib/localStorage/CreatedSkillsStorage';
import type { Skill } from '@/shared/types';

interface SkillsState {
  items: Skill[];
  currentSkill: Skill | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SkillsState = {
  items: [],
  currentSkill: null,
  isLoading: false,
  error: null,
};

// ─── Thunks ──────────────────────────────────────────────

export const fetchSkillsThunk = createAsyncThunk<Skill[], void, { rejectValue: string }>(
  'skills/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const skillsFromJson = await fetchSkills();
      const createdSkills = getCreatedSkillsFromStorage();
      return [...skillsFromJson, ...createdSkills];
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  },
);

export const fetchSkillByIdThunk = createAsyncThunk<Skill | null, string, { rejectValue: string }>(
  'skills/fetchById',
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { skills: SkillsState };

      const skillFromState = state.skills.items.find((skill) => skill.id === id);

      if (skillFromState) {
        return skillFromState;
      }

      const createdSkills = getCreatedSkillsFromStorage();

      const skillFromStorage = createdSkills.find((skill) => skill.id === id);

      if (skillFromStorage) {
        return skillFromStorage;
      }

      const skillFromJson = await fetchSkillById(id);

      return skillFromJson ?? null;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  },
);

export const createSkillThunk = createAsyncThunk<
  Skill,
  Omit<Skill, 'id' | 'createdAt' | 'source'> & { authorId: string },
  { rejectValue: string }
>('skills/create', async (skillData, { rejectWithValue }) => {
  try {
    const newSkill: Skill = {
      ...skillData,
      id: `skill-created-${Date.now()}`,
      createdAt: new Date().toISOString(),
      source: 'created',
    };

    const existing = getCreatedSkillsFromStorage();
    saveCreatedSkillsToStorage([...existing, newSkill]);

    return newSkill;
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : 'Failed to create skill');
  }
});

export const updateSkillThunk = createAsyncThunk<
  Skill,
  { skillId: string; updates: Partial<Skill>; currentUserId: string },
  { rejectValue: string }
>('skills/update', async ({ skillId, updates, currentUserId }, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { skills: SkillsState };
    const skill = state.skills.items.find((s) => s.id === skillId);

    if (!skill) return rejectWithValue('Skill not found');
    if (skill.authorId !== currentUserId) return rejectWithValue('Not authorized');
    if (skill.source !== 'created') return rejectWithValue('Cannot edit mock skills');

    const updatedSkill: Skill = { ...skill, ...updates };

    const existing = getCreatedSkillsFromStorage();
    saveCreatedSkillsToStorage(existing.map((s) => (s.id === skillId ? updatedSkill : s)));

    return updatedSkill;
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : 'Failed to update skill');
  }
});

export const deleteSkillThunk = createAsyncThunk<
  string,
  { skillId: string; currentUserId: string },
  { rejectValue: string }
>('skills/delete', async ({ skillId, currentUserId }, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { skills: SkillsState };
    const skill = state.skills.items.find((s) => s.id === skillId);

    if (!skill) return rejectWithValue('Skill not found');
    if (skill.authorId !== currentUserId) return rejectWithValue('Not authorized');
    if (skill.source !== 'created') return rejectWithValue('Cannot delete mock skills');

    const existing = getCreatedSkillsFromStorage();
    saveCreatedSkillsToStorage(existing.filter((s) => s.id !== skillId));

    return skillId;
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : 'Failed to delete skill');
  }
});

// ─── Slice ───────────────────────────────────────────────

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearSkillsError: (state) => {
      state.error = null;
    },
    clearCurrentSkill: (state) => {
      state.currentSkill = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSkillsThunk
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
      // fetchSkillByIdThunk
      .addCase(fetchSkillByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSkillByIdThunk.fulfilled, (state, action: PayloadAction<Skill | null>) => {
        state.isLoading = false;
        state.currentSkill = action.payload;
      })
      .addCase(fetchSkillByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to fetch skill';
      })
      // createSkillThunk
      .addCase(createSkillThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSkillThunk.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createSkillThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to create skill';
      })
      // updateSkillThunk
      .addCase(updateSkillThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSkillThunk.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.isLoading = false;
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        if (state.currentSkill?.id === action.payload.id) state.currentSkill = action.payload;
      })
      .addCase(updateSkillThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to update skill';
      })
      // deleteSkillThunk
      .addCase(deleteSkillThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSkillThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.items = state.items.filter((s) => s.id !== action.payload);
        if (state.currentSkill?.id === action.payload) state.currentSkill = null;
      })
      .addCase(deleteSkillThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to delete skill';
      });
  },
});

export const { clearSkillsError, clearCurrentSkill } = skillsSlice.actions;

// ─── Selectors ───────────────────────────────────────────

export const selectSkills = (state: { skills: SkillsState }) => state.skills.items;
export const selectCurrentSkill = (state: { skills: SkillsState }) => state.skills.currentSkill;
export const selectSkillsLoading = (state: { skills: SkillsState }) => state.skills.isLoading;
export const selectSkillsError = (state: { skills: SkillsState }) => state.skills.error;
export const selectSkillById = (id: string) => (state: { skills: SkillsState }) =>
  state.skills.items.find((s) => s.id === id) ?? null;

export const selectSkillsByAuthorId = (authorId: string) => (state: { skills: SkillsState }) =>
  state.skills.items.filter((skill) => skill.authorId === authorId);

export const selectCurrentUserSkills = (state: {
  skills: SkillsState;
  auth: { user: { id: string } | null };
}) => {
  const currentUserId = state.auth.user?.id;
  return currentUserId
    ? state.skills.items.filter((skill) => skill.authorId === currentUserId)
    : [];
};

export default skillsSlice.reducer;
