import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import filtrationReducer, {
  toggleCategory,
  toggleSubcategory,
  setExchangeType,
  setGender,
  setCity,
  setSearchValue,
  resetFilters,
  selectFiltration,
  selectSelectedCategoryIds,
  selectSelectedSubcategoryIds,
  selectExchangeType,
  selectGender,
  selectCity,
  selectSearchValue,
  selectAvailableCities,
  selectFilteredSkills,
} from './filtrationSlice';
import usersReducer from '@/entities/user/model/usersSlice';
import skillsReducer from '@/entities/skill/model/skillsSlice';
import favoriteReducer from '@/features/favorite/model/favoriteSlice';
import authReducer from '@/features/auth/model/authSlice';
import requestsReducer from '@/features/requests/model/requestsSlice';
import type { UserInfo, Skill } from '@/shared/types';
import type { RootState } from '@/store';

const rootReducer = combineReducers({
  filtration: filtrationReducer,
  users: usersReducer,
  skills: skillsReducer,
  favorite: favoriteReducer,
  auth: authReducer,
  requests: requestsReducer,
});

type TestState = ReturnType<typeof rootReducer>;

const createTestStore = (preloadedState?: Partial<TestState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

type TestStore = ReturnType<typeof createTestStore>;
const getStateAsRoot = (store: TestStore): RootState => store.getState() as unknown as RootState;

const mockUsers: UserInfo[] = [
  {
    id: 'user-1',
    name: 'User One',
    email: 'one@test.com',
    avatarUrl: null,
    createdAt: '2024-01-01',
    gender: 'male',
    city: 'Moscow',
  },
  {
    id: 'user-2',
    name: 'User Two',
    email: 'two@test.com',
    avatarUrl: null,
    createdAt: '2024-01-01',
    gender: 'female',
    city: 'SPb',
  },
  {
    id: 'user-3',
    name: 'User Three',
    email: 'three@test.com',
    avatarUrl: null,
    createdAt: '2024-01-01',
    gender: 'male',
    city: 'Moscow',
  },
];

const mockSkills: Skill[] = [
  {
    id: 'skill-1',
    title: 'React',
    description: 'Frontend library for building UI',
    type: 'teach',
    category: 'business',
    categoryId: 'cat-1',
    subcategory: 'Frontend',
    subcategoryId: 'sub-1',
    tags: [],
    imageUrl: null,
    authorId: 'user-1',
    createdAt: '2024-01-01',
    source: 'mock',
  },
  {
    id: 'skill-2',
    title: 'Vue',
    description: 'Progressive JavaScript framework',
    type: 'learn',
    category: 'business',
    categoryId: 'cat-1',
    subcategory: 'Frontend',
    subcategoryId: 'sub-2',
    tags: [],
    imageUrl: null,
    authorId: 'user-1',
    createdAt: '2024-01-01',
    source: 'mock',
  },
  {
    id: 'skill-3',
    title: 'Guitar',
    description: 'Acoustic music instrument',
    type: 'teach',
    category: 'art',
    categoryId: 'cat-2',
    subcategory: 'Music',
    subcategoryId: 'sub-3',
    tags: [],
    imageUrl: null,
    authorId: 'user-2',
    createdAt: '2024-01-01',
    source: 'mock',
  },
];

describe('filtrationSlice', () => {
  let store: TestStore;

  beforeEach(() => {
    store = createTestStore({
      users: { items: mockUsers, currentUser: null, isLoading: false, error: null },
      skills: { items: mockSkills, currentSkill: null, isLoading: false, error: null },
      favorite: { favoriteUserIds: [], error: null },
      auth: { user: null, token: null, isAuth: false, isLoading: false, error: null },
      requests: { items: [], isLoading: false, error: null },
      filtration: {
        selectedCategoryIds: [],
        selectedSubcategoryIds: [],
        exchangeType: 'all',
        gender: 'any',
        city: '',
        searchValue: '',
      },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = selectFiltration(getStateAsRoot(store));
      expect(state.selectedCategoryIds).toEqual([]);
      expect(state.selectedSubcategoryIds).toEqual([]);
      expect(state.exchangeType).toBe('all');
      expect(state.gender).toBe('any');
      expect(state.city).toBe('');
      expect(state.searchValue).toBe('');
    });
  });

  describe('toggleCategory', () => {
    it('should add category and its subcategories', () => {
      store.dispatch(toggleCategory({ categoryId: 'cat-1', subcategoryIds: ['sub-1', 'sub-2'] }));

      expect(selectSelectedCategoryIds(getStateAsRoot(store))).toContain('cat-1');
      expect(selectSelectedSubcategoryIds(getStateAsRoot(store))).toEqual(['sub-1', 'sub-2']);
    });

    it('should remove category and its subcategories on second toggle', () => {
      store.dispatch(toggleCategory({ categoryId: 'cat-1', subcategoryIds: ['sub-1', 'sub-2'] }));
      store.dispatch(toggleCategory({ categoryId: 'cat-1', subcategoryIds: ['sub-1', 'sub-2'] }));

      expect(selectSelectedCategoryIds(getStateAsRoot(store))).not.toContain('cat-1');
      expect(selectSelectedSubcategoryIds(getStateAsRoot(store))).toEqual([]);
    });
  });

  describe('toggleSubcategory', () => {
    it('should add subcategory', () => {
      store.dispatch(toggleSubcategory('sub-1'));

      expect(selectSelectedSubcategoryIds(getStateAsRoot(store))).toContain('sub-1');
    });

    it('should remove subcategory on second toggle', () => {
      store.dispatch(toggleSubcategory('sub-1'));
      store.dispatch(toggleSubcategory('sub-1'));

      expect(selectSelectedSubcategoryIds(getStateAsRoot(store))).not.toContain('sub-1');
    });
  });

  describe('setters', () => {
    it('should set exchange type', () => {
      store.dispatch(setExchangeType('teach'));
      expect(selectExchangeType(getStateAsRoot(store))).toBe('teach');
    });

    it('should set gender', () => {
      store.dispatch(setGender('female'));
      expect(selectGender(getStateAsRoot(store))).toBe('female');
    });

    it('should set city', () => {
      store.dispatch(setCity('Kazan'));
      expect(selectCity(getStateAsRoot(store))).toBe('Kazan');
    });

    it('should set search value', () => {
      store.dispatch(setSearchValue('react'));
      expect(selectSearchValue(getStateAsRoot(store))).toBe('react');
    });
  });

  describe('resetFilters', () => {
    it('should reset all filters to initial state', () => {
      store.dispatch(setExchangeType('teach'));
      store.dispatch(setGender('male'));
      store.dispatch(setCity('Moscow'));
      store.dispatch(setSearchValue('test'));
      store.dispatch(toggleCategory({ categoryId: 'cat-1', subcategoryIds: ['sub-1'] }));

      store.dispatch(resetFilters());

      expect(selectFiltration(getStateAsRoot(store))).toEqual({
        selectedCategoryIds: [],
        selectedSubcategoryIds: [],
        exchangeType: 'all',
        gender: 'any',
        city: '',
        searchValue: '',
      });
    });
  });

  describe('selectFilteredSkills', () => {
    it('should return all skills without filters', () => {
      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(3);
      expect(skills.map((s) => s.id)).toEqual(['skill-1', 'skill-2', 'skill-3']);
    });

    it('should filter by category', () => {
      store.dispatch(toggleCategory({ categoryId: 'cat-1', subcategoryIds: ['sub-1', 'sub-2'] }));

      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(2);
      expect(skills.map((s) => s.id)).toEqual(['skill-1', 'skill-2']);
    });

    it('should filter by subcategory', () => {
      store.dispatch(toggleSubcategory('sub-3'));

      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(1);
      expect(skills[0].id).toBe('skill-3');
    });

    it('should filter by exchange type teach', () => {
      store.dispatch(setExchangeType('teach'));

      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(2);
      expect(skills.every((s) => s.type === 'teach')).toBe(true);
    });

    it('should filter by exchange type learn', () => {
      store.dispatch(setExchangeType('learn'));

      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(1);
      expect(skills[0].id).toBe('skill-2');
    });

    it('should filter by gender', () => {
      store.dispatch(setGender('female'));

      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(1);
      expect(skills[0].id).toBe('skill-3');
    });

    it('should filter by city', () => {
      store.dispatch(setCity('Moscow'));

      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(2);
      expect(skills.map((s) => s.id)).toEqual(['skill-1', 'skill-2']);
    });

    it('should filter by title case-insensitively', () => {
      store.dispatch(setSearchValue('REACT'));

      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(1);
      expect(skills[0].title).toBe('React');
    });

    it('should filter by description case-insensitively', () => {
      store.dispatch(setSearchValue('ACOUSTIC'));

      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(1);
      expect(skills[0].title).toBe('Guitar');
    });

    it('should combine filters by AND', () => {
      store.dispatch(toggleCategory({ categoryId: 'cat-1', subcategoryIds: ['sub-1', 'sub-2'] }));
      store.dispatch(setExchangeType('teach'));
      store.dispatch(setGender('male'));
      store.dispatch(setCity('Moscow'));

      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(1);
      expect(skills[0].id).toBe('skill-1');
    });

    it('should return empty array when no skills match combined filters', () => {
      store.dispatch(toggleCategory({ categoryId: 'cat-1', subcategoryIds: ['sub-1', 'sub-2'] }));
      store.dispatch(setGender('female'));

      const skills = selectFilteredSkills(getStateAsRoot(store));

      expect(skills).toHaveLength(0);
    });
  });

  describe('selectAvailableCities', () => {
    it('should return unique cities from users', () => {
      const cities = selectAvailableCities(getStateAsRoot(store));

      expect(cities).toEqual(['Moscow', 'SPb']);
    });

    it('should skip users without city', () => {
      const cities = selectAvailableCities(getStateAsRoot(store));

      expect(cities).not.toContain(undefined);
      expect(cities).not.toContain('');
    });
  });
});
