import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import skillsReducer, {
  fetchSkillsThunk,
  fetchSkillByIdThunk,
  clearSkillsError,
  clearCurrentSkill,
  selectSkills,
  selectCurrentSkill,
  selectSkillsLoading,
  selectSkillsError,
} from './skillsSlice';
import * as skillsApi from '@/api/skills';
import type { Skill } from '@/shared/types';

vi.mock('@/api/skills');

const mockSkills: Skill[] = [
  {
    id: '1',
    title: 'React',
    description: 'Frontend framework',
    type: 'teach',
    category: 'business',
    categoryId: 'cat-1',
    subcategory: 'Frontend',
    subcategoryId: 'sub-1',
    tags: ['js', 'ui'],
    imageUrl: null,
    authorId: 'user1',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Node.js',
    description: 'Backend runtime',
    type: 'learn',
    category: 'education',
    categoryId: 'cat-2',
    subcategory: 'Backend',
    subcategoryId: 'sub-2',
    tags: ['js', 'server'],
    imageUrl: null,
    authorId: 'user2',
    createdAt: '2024-01-02',
  },
];

const createTestStore = () =>
  configureStore({
    reducer: { skills: skillsReducer },
  });

type TestStore = ReturnType<typeof createTestStore>;

describe('skillsSlice', () => {
  let store: TestStore;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
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

  describe('reducers', () => {
    it('clearSkillsError should clear error', () => {
      store.dispatch(clearSkillsError());
      expect(selectSkillsError(store.getState())).toBeNull();
    });

    it('clearCurrentSkill should clear current skill', () => {
      store.dispatch(clearCurrentSkill());
      expect(selectCurrentSkill(store.getState())).toBeNull();
    });
  });

  describe('selectors', () => {
    it('selectSkills should return items', () => {
      expect(selectSkills(store.getState())).toEqual([]);
    });

    it('selectSkillsLoading should return isLoading', () => {
      expect(selectSkillsLoading(store.getState())).toBe(false);
    });
  });

  describe('fetchSkillsThunk', () => {
    it('should handle pending state', () => {
      store.dispatch(fetchSkillsThunk.pending('', undefined));
      expect(selectSkillsLoading(store.getState())).toBe(true);
      expect(selectSkillsError(store.getState())).toBeNull();
    });

    it('should handle fulfilled state', async () => {
      vi.mocked(skillsApi.fetchSkills).mockResolvedValue(mockSkills);

      await store.dispatch(fetchSkillsThunk());

      expect(selectSkills(store.getState())).toEqual(mockSkills);
      expect(selectSkillsLoading(store.getState())).toBe(false);
      expect(selectSkillsError(store.getState())).toBeNull();
    });

    it('should handle rejected state', async () => {
      vi.mocked(skillsApi.fetchSkills).mockRejectedValue(new Error('Network error'));

      await store.dispatch(fetchSkillsThunk());

      expect(selectSkillsLoading(store.getState())).toBe(false);
      expect(selectSkillsError(store.getState())).toBe('Network error');
    });
  });

  describe('fetchSkillByIdThunk', () => {
    it('should handle fulfilled with found skill', async () => {
      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(mockSkills[0]);

      await store.dispatch(fetchSkillByIdThunk('1'));

      expect(selectCurrentSkill(store.getState())).toEqual(mockSkills[0]);
      expect(selectSkillsLoading(store.getState())).toBe(false);
    });

    it('should handle fulfilled with not found skill', async () => {
      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(undefined);

      await store.dispatch(fetchSkillByIdThunk('999'));

      expect(selectCurrentSkill(store.getState())).toBeNull();
    });

    it('should handle rejected state', async () => {
      vi.mocked(skillsApi.fetchSkillById).mockRejectedValue(new Error('Not found'));

      await store.dispatch(fetchSkillByIdThunk('1'));

      expect(selectSkillsLoading(store.getState())).toBe(false);
      expect(selectSkillsError(store.getState())).toBe('Not found');
    });
  });
});
