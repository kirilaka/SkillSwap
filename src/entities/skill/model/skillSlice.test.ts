// Чистое тестирование через configureStore
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import skillsReducer, {
  fetchSkillsThunk,
  fetchSkillByIdThunk,
  createSkillThunk,
  updateSkillThunk,
  deleteSkillThunk,
  clearSkillsError,
  clearCurrentSkill,
  selectSkills,
  selectCurrentSkill,
  selectSkillsLoading,
  selectSkillsError,
  selectSkillById,
  selectSkillsByAuthorId,
  selectCurrentUserSkills,
} from './skillsSlice';
import * as skillsApi from '@/api/skills';
import * as storage from '@/shared/lib/localStorage/CreatedSkillsStorage';
import type { Skill } from '@/shared/types';

vi.mock('@/api/skills');

const mockSkill: Skill = {
  id: 'skill-1',
  title: 'React',
  description: 'Frontend',
  type: 'teach',
  category: 'business',
  categoryId: 'cat-1',
  subcategory: 'Frontend',
  subcategoryId: 'sub-1',
  tags: [],
  imageUrl: null,
  authorId: 'user1',
  createdAt: '2024-01-01',
  source: 'mock',
};

const createdSkill: Skill = {
  ...mockSkill,
  id: 'skill-created-1',
  title: 'Vue',
  source: 'created',
};

// ─── Типизированный root reducer для тестов ─────────────────────────

interface AuthState {
  user: { id: string } | null;
}

const authReducer = (state: AuthState = { user: null }) => state;

const rootReducer = combineReducers({
  skills: skillsReducer,
  auth: authReducer,
});

type RootState = ReturnType<typeof rootReducer>;

const createTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

type TestStore = ReturnType<typeof createTestStore>;

// ─── Tests ───────────────────────────────────────────────────────────

describe('skillsSlice', () => {
  let store: TestStore;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState();
      expect(state.skills.items).toEqual([]);
      expect(state.skills.currentSkill).toBeNull();
      expect(state.skills.isLoading).toBe(false);
      expect(state.skills.error).toBeNull();
    });
  });

  // ─── fetchSkillsThunk ─────────────────────────────────────

  describe('fetchSkillsThunk', () => {
    it('should merge mock and created skills', async () => {
      vi.mocked(skillsApi.fetchSkills).mockResolvedValue([mockSkill]);
      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([createdSkill]);

      await store.dispatch(fetchSkillsThunk());

      const skills = selectSkills(store.getState());
      expect(skills).toHaveLength(2);
      expect(skills[1].source).toBe('created');
    });

    it('should handle rejected', async () => {
      vi.mocked(skillsApi.fetchSkills).mockRejectedValue(new Error('Network error'));

      await store.dispatch(fetchSkillsThunk());

      expect(selectSkillsError(store.getState())).toBe('Network error');
      expect(selectSkillsLoading(store.getState())).toBe(false);
    });
  });

  // ─── fetchSkillByIdThunk ─────────────────────────────────

  describe('fetchSkillByIdThunk', () => {
    it('fulfilled: should set currentSkill', async () => {
      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(mockSkill);

      await store.dispatch(fetchSkillByIdThunk('skill-1'));

      expect(selectCurrentSkill(store.getState())).toEqual(mockSkill);
      expect(selectSkillsLoading(store.getState())).toBe(false);
    });

    it('fulfilled: should set null if skill not found', async () => {
      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(undefined as unknown as Skill);

      await store.dispatch(fetchSkillByIdThunk('non-existent'));

      expect(selectCurrentSkill(store.getState())).toBeNull();
    });

    it('rejected: should set error', async () => {
      vi.mocked(skillsApi.fetchSkillById).mockRejectedValue(new Error('Not found'));

      await store.dispatch(fetchSkillByIdThunk('skill-1'));

      expect(selectSkillsError(store.getState())).toBe('Not found');
      expect(selectSkillsLoading(store.getState())).toBe(false);
    });
  });

  // ─── createSkillThunk ──────────────────────────────────────

  describe('createSkillThunk', () => {
    it('should create skill with source created', async () => {
      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([]);
      vi.spyOn(storage, 'saveCreatedSkillsToStorage').mockImplementation(() => {});

      await store.dispatch(
        createSkillThunk({
          title: 'New Skill',
          description: 'Desc',
          type: 'teach',
          category: 'art',
          categoryId: 'cat-1',
          subcategory: 'Music',
          subcategoryId: 'sub-1',
          tags: [],
          imageUrl: null,
          authorId: 'user1',
        }),
      );

      const skills = selectSkills(store.getState());
      expect(skills).toHaveLength(1);
      expect(skills[0].source).toBe('created');
      expect(skills[0].authorId).toBe('user1');
      expect(skills[0].id).toMatch(/^skill-created-/);

      expect(storage.saveCreatedSkillsToStorage).toHaveBeenCalled();
    });
  });

  // ─── updateSkillThunk ──────────────────────────────────────

  describe('updateSkillThunk', () => {
    it('should update own created skill', async () => {
      const myCreatedSkill: Skill = { ...createdSkill, authorId: 'user1' };
      store = createTestStore({
        skills: {
          items: [myCreatedSkill],
          currentSkill: null,
          isLoading: false,
          error: null,
        },
      });

      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([myCreatedSkill]);
      vi.spyOn(storage, 'saveCreatedSkillsToStorage').mockImplementation(() => {});

      await store.dispatch(
        updateSkillThunk({
          skillId: 'skill-created-1',
          updates: { title: 'Updated Vue' },
          currentUserId: 'user1',
        }),
      );

      const skills = selectSkills(store.getState());
      expect(skills[0].title).toBe('Updated Vue');
      expect(storage.saveCreatedSkillsToStorage).toHaveBeenCalled();
    });

    it('should reject updating other user skill', async () => {
      const otherSkill: Skill = { ...createdSkill, authorId: 'user2' };
      store = createTestStore({
        skills: {
          items: [otherSkill],
          currentSkill: null,
          isLoading: false,
          error: null,
        },
      });

      await store.dispatch(
        updateSkillThunk({
          skillId: 'skill-created-1',
          updates: { title: 'Hacked' },
          currentUserId: 'user1',
        }),
      );

      expect(selectSkillsError(store.getState())).toBe('Not authorized');
      expect(selectSkills(store.getState())[0].title).toBe('Vue');
    });

    it('should reject updating mock skill', async () => {
      store = createTestStore({
        skills: {
          items: [mockSkill],
          currentSkill: null,
          isLoading: false,
          error: null,
        },
      });

      await store.dispatch(
        updateSkillThunk({
          skillId: 'skill-1',
          updates: { title: 'Hacked' },
          currentUserId: 'user1',
        }),
      );

      expect(selectSkillsError(store.getState())).toBe('Cannot edit mock skills');
    });
  });

  // ─── deleteSkillThunk ──────────────────────────────────────

  describe('deleteSkillThunk', () => {
    it('should delete own created skill', async () => {
      const myCreatedSkill: Skill = { ...createdSkill, authorId: 'user1' };
      store = createTestStore({
        skills: {
          items: [myCreatedSkill],
          currentSkill: null,
          isLoading: false,
          error: null,
        },
      });

      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([myCreatedSkill]);
      vi.spyOn(storage, 'saveCreatedSkillsToStorage').mockImplementation(() => {});

      await store.dispatch(
        deleteSkillThunk({
          skillId: 'skill-created-1',
          currentUserId: 'user1',
        }),
      );

      expect(selectSkills(store.getState())).toHaveLength(0);
      expect(storage.saveCreatedSkillsToStorage).toHaveBeenCalled();
    });

    it('should reject deleting other user skill', async () => {
      const otherSkill: Skill = { ...createdSkill, authorId: 'user2' };
      store = createTestStore({
        skills: {
          items: [otherSkill],
          currentSkill: null,
          isLoading: false,
          error: null,
        },
      });

      await store.dispatch(
        deleteSkillThunk({
          skillId: 'skill-created-1',
          currentUserId: 'user1',
        }),
      );

      expect(selectSkillsError(store.getState())).toBe('Not authorized');
      expect(selectSkills(store.getState())).toHaveLength(1);
    });

    it('should reject deleting mock skill', async () => {
      store = createTestStore({
        skills: {
          items: [mockSkill],
          currentSkill: null,
          isLoading: false,
          error: null,
        },
      });

      await store.dispatch(
        deleteSkillThunk({
          skillId: 'skill-1',
          currentUserId: 'user1',
        }),
      );

      expect(selectSkillsError(store.getState())).toBe('Cannot delete mock skills');
    });
  });

  // ─── Reducer actions ───────────────────────────────────────

  describe('reducer actions', () => {
    it('clearSkillsError should reset error', async () => {
      vi.mocked(skillsApi.fetchSkills).mockRejectedValue(new Error('Fail'));
      await store.dispatch(fetchSkillsThunk());

      expect(selectSkillsError(store.getState())).toBe('Fail');

      store.dispatch(clearSkillsError());

      expect(selectSkillsError(store.getState())).toBeNull();
    });

    it('clearCurrentSkill should reset currentSkill', async () => {
      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(mockSkill);
      await store.dispatch(fetchSkillByIdThunk('skill-1'));

      expect(selectCurrentSkill(store.getState())).toEqual(mockSkill);

      store.dispatch(clearCurrentSkill());

      expect(selectCurrentSkill(store.getState())).toBeNull();
    });
  });

  // ─── Selectors ─────────────────────────────────────────────

  describe('selectors', () => {
    it('selectSkillById should find skill by id', async () => {
      vi.mocked(skillsApi.fetchSkills).mockResolvedValue([mockSkill]);
      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([]);

      await store.dispatch(fetchSkillsThunk());

      const skill = selectSkillById('skill-1')(store.getState());
      expect(skill).toEqual(mockSkill);
    });

    it('selectSkillsByAuthorId should filter by author', async () => {
      vi.mocked(skillsApi.fetchSkills).mockResolvedValue([
        { ...mockSkill, authorId: 'user1' },
        { ...mockSkill, id: 'skill-2', authorId: 'user2' },
      ]);
      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([]);

      await store.dispatch(fetchSkillsThunk());

      const user1Skills = selectSkillsByAuthorId('user1')(store.getState());
      expect(user1Skills).toHaveLength(1);
      expect(user1Skills[0].authorId).toBe('user1');
    });

    it('selectCurrentUserSkills should return empty if no user', () => {
      expect(selectCurrentUserSkills(store.getState())).toEqual([]);
    });

    it('selectCurrentUserSkills should return skills for authenticated user', () => {
      store = createTestStore({
        skills: {
          items: [
            { ...mockSkill, authorId: 'user1' },
            { ...mockSkill, id: 'skill-2', authorId: 'user2' },
            { ...mockSkill, id: 'skill-3', authorId: 'user1' },
          ],
          currentSkill: null,
          isLoading: false,
          error: null,
        },
        auth: { user: { id: 'user1' } },
      });

      const userSkills = selectCurrentUserSkills(store.getState());
      expect(userSkills).toHaveLength(2);
      expect(userSkills.every((s) => s.authorId === 'user1')).toBe(true);
    });
  });
});
