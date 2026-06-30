import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import skillsReducer, {
  fetchSkillsThunk,
  createSkillThunk,
  selectSkills,
  selectSkillsByAuthorId,
  selectCurrentUserSkills,
} from './skillsSlice';
import * as skillsApi from '@/api/skills';
import * as storage from '@/shared/lib/localStorage/CreatedSkillsStorage';
import type { Skill } from '@/shared/types';

vi.mock('@/api/skills');
vi.mock('@/shared/lib/localStorage/createdSkillsStorage');

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

const authReducer = (state = { user: null }) => state;

const createTestStore = () =>
  configureStore({
    reducer: { skills: skillsReducer, auth: authReducer },
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

  describe('fetchSkillsThunk', () => {
    it('should merge mock and created skills', async () => {
      const createdSkill: Skill = { ...mockSkill, id: 'created-1', source: 'created' };
      vi.mocked(skillsApi.fetchSkills).mockResolvedValue([mockSkill]);
      vi.mocked(storage.getCreatedSkillsFromStorage).mockReturnValue([createdSkill]);

      await store.dispatch(fetchSkillsThunk());

      expect(selectSkills(store.getState())).toHaveLength(2);
      expect(selectSkills(store.getState())[1].source).toBe('created');
    });
  });

  describe('createSkillThunk', () => {
    it('should create skill with source created', async () => {
      vi.mocked(storage.getCreatedSkillsFromStorage).mockReturnValue([]);
      vi.mocked(storage.saveCreatedSkillsToStorage).mockImplementation(() => {});

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
    });
  });

  describe('selectors', () => {
    it('selectSkillsByAuthorId should filter by author', async () => {
      vi.mocked(skillsApi.fetchSkills).mockResolvedValue([
        { ...mockSkill, authorId: 'user1' },
        { ...mockSkill, id: 'skill-2', authorId: 'user2' },
      ]);
      vi.mocked(storage.getCreatedSkillsFromStorage).mockReturnValue([]);

      await store.dispatch(fetchSkillsThunk());

      const user1Skills = selectSkillsByAuthorId('user1')(store.getState());
      expect(user1Skills).toHaveLength(1);
      expect(user1Skills[0].authorId).toBe('user1');
    });

    it('selectCurrentUserSkills should return empty if no user', () => {
      expect(selectCurrentUserSkills(store.getState())).toEqual([]);
    });
  });
});
