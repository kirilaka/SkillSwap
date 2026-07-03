// src/features/filtration/models/filtrationSlice.integration.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  toggleCategory,
  toggleSubcategory,
  setExchangeType,
  setGender,
  setCity,
  setSearchValue,
  resetFilters,
  selectSelectedCategoryIds,
  selectSelectedSubcategoryIds,
  selectExchangeType,
  selectGender,
  selectCity,
  selectSearchValue,
  selectFilteredSkills,
} from './filtrationSlice';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProvider';
import type { UserInfo } from '@/shared/types';

const mockUsers: UserInfo[] = [
  {
    id: 'user-1',
    name: 'User One',
    email: 'one@test.com',
    avatarUrl: null,
    createdAt: '2024-01-01',
    gender: 'male',
    city: 'Moscow',
    skills: [
      {
        id: 'skill-1',
        title: 'React',
        description: 'Frontend library',
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
        description: 'Progressive framework',
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
    ],
  },
  {
    id: 'user-2',
    name: 'User Two',
    email: 'two@test.com',
    avatarUrl: null,
    createdAt: '2024-01-01',
    gender: 'female',
    city: 'SPb',
    skills: [
      {
        id: 'skill-3',
        title: 'Guitar',
        description: 'Music instrument',
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
    ],
  },
];

// ─── Тестовые компоненты ─────────────────────────────────────────

function FiltrationTestComponent() {
  const dispatch = useAppDispatch();
  const categoryIds = useAppSelector(selectSelectedCategoryIds);
  const subcategoryIds = useAppSelector(selectSelectedSubcategoryIds);
  const exchangeType = useAppSelector(selectExchangeType);
  const gender = useAppSelector(selectGender);
  const city = useAppSelector(selectCity);
  const searchValue = useAppSelector(selectSearchValue);

  return (
    <div>
      <div data-testid="categories">{categoryIds.join(',')}</div>
      <div data-testid="subcategories">{subcategoryIds.join(',')}</div>
      <div data-testid="exchange">{exchangeType}</div>
      <div data-testid="gender">{gender}</div>
      <div data-testid="city">{city}</div>
      <div data-testid="search">{searchValue}</div>
      <button
        onClick={() => dispatch(toggleCategory({ categoryId: 'cat-1', subcategoryIds: ['sub-1'] }))}
      >
        Toggle Cat
      </button>
      <button onClick={() => dispatch(toggleSubcategory('sub-2'))}>Toggle Sub</button>
      <button onClick={() => dispatch(setExchangeType('teach'))}>Set Teach</button>
      <button onClick={() => dispatch(setGender('female'))}>Set Female</button>
      <button onClick={() => dispatch(setCity('Moscow'))}>Set City</button>
      <button onClick={() => dispatch(setSearchValue('react'))}>Set Search</button>
      <button onClick={() => dispatch(resetFilters())}>Reset</button>
    </div>
  );
}

function FilteredSkillsTestComponent() {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(selectFilteredSkills);

  return (
    <div>
      <div data-testid="skills-count">{skills.length}</div>
      <div data-testid="skills-titles">{skills.map((s) => s.title).join(',')}</div>
      <button
        onClick={() =>
          dispatch(toggleCategory({ categoryId: 'cat-1', subcategoryIds: ['sub-1', 'sub-2'] }))
        }
      >
        Filter Cat
      </button>
      <button onClick={() => dispatch(setExchangeType('teach'))}>Filter Teach</button>
      <button onClick={() => dispatch(setGender('female'))}>Filter Female</button>
      <button onClick={() => dispatch(setCity('Moscow'))}>Filter City</button>
      <button onClick={() => dispatch(setSearchValue('guitar'))}>Filter Search</button>
      <button onClick={() => dispatch(resetFilters())}>Reset Filters</button>
    </div>
  );
}

// ─── Tests ─────────────────────────────────────────────────────────

describe('filtrationSlice with renderWithProviders', () => {
  beforeEach(() => {
    // nothing to clear
  });

  describe('initial state', () => {
    it('should render correct initial state', () => {
      renderWithProviders(<FiltrationTestComponent />);

      expect(screen.getByTestId('categories')).toHaveTextContent('');
      expect(screen.getByTestId('subcategories')).toHaveTextContent('');
      expect(screen.getByTestId('exchange')).toHaveTextContent('all');
      expect(screen.getByTestId('gender')).toHaveTextContent('any');
      expect(screen.getByTestId('city')).toHaveTextContent('');
      expect(screen.getByTestId('search')).toHaveTextContent('');
    });
  });

  describe('toggleCategory', () => {
    it('should add category and subcategories', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FiltrationTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Toggle Cat' }));

      expect(screen.getByTestId('categories')).toHaveTextContent('cat-1');
      expect(screen.getByTestId('subcategories')).toHaveTextContent('sub-1');
    });

    it('should remove category and subcategories on second click', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FiltrationTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Toggle Cat' }));
      await user.click(screen.getByRole('button', { name: 'Toggle Cat' }));

      expect(screen.getByTestId('categories')).toHaveTextContent('');
      expect(screen.getByTestId('subcategories')).toHaveTextContent('');
    });
  });

  describe('toggleSubcategory', () => {
    it('should add and remove subcategory', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FiltrationTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Toggle Sub' }));
      expect(screen.getByTestId('subcategories')).toHaveTextContent('sub-2');

      await user.click(screen.getByRole('button', { name: 'Toggle Sub' }));
      expect(screen.getByTestId('subcategories')).toHaveTextContent('');
    });
  });

  describe('setExchangeType', () => {
    it('should update exchange type', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FiltrationTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Set Teach' }));
      expect(screen.getByTestId('exchange')).toHaveTextContent('teach');
    });
  });

  describe('setGender', () => {
    it('should update gender', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FiltrationTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Set Female' }));
      expect(screen.getByTestId('gender')).toHaveTextContent('female');
    });
  });

  describe('setCity', () => {
    it('should update city', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FiltrationTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Set City' }));
      expect(screen.getByTestId('city')).toHaveTextContent('Moscow');
    });
  });

  describe('setSearchValue', () => {
    it('should update search value', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FiltrationTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Set Search' }));
      expect(screen.getByTestId('search')).toHaveTextContent('react');
    });
  });

  describe('resetFilters', () => {
    it('should reset all filters', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FiltrationTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Toggle Cat' }));
      await user.click(screen.getByRole('button', { name: 'Set Teach' }));
      await user.click(screen.getByRole('button', { name: 'Set Female' }));
      await user.click(screen.getByRole('button', { name: 'Set City' }));
      await user.click(screen.getByRole('button', { name: 'Set Search' }));

      await user.click(screen.getByRole('button', { name: 'Reset' }));

      expect(screen.getByTestId('categories')).toHaveTextContent('');
      expect(screen.getByTestId('subcategories')).toHaveTextContent('');
      expect(screen.getByTestId('exchange')).toHaveTextContent('all');
      expect(screen.getByTestId('gender')).toHaveTextContent('any');
      expect(screen.getByTestId('city')).toHaveTextContent('');
      expect(screen.getByTestId('search')).toHaveTextContent('');
    });
  });

  describe('selectFilteredSkills', () => {
    it('should show all skills without filters', () => {
      renderWithProviders(<FilteredSkillsTestComponent />, {
        preloadedState: {
          users: { items: mockUsers, currentUser: null, isLoading: false, error: null },
        },
      });

      expect(screen.getByTestId('skills-count')).toHaveTextContent('3');
      expect(screen.getByTestId('skills-titles')).toHaveTextContent('React,Vue,Guitar');
    });

    it('should filter by category', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FilteredSkillsTestComponent />, {
        preloadedState: {
          users: { items: mockUsers, currentUser: null, isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Filter Cat' }));

      expect(screen.getByTestId('skills-count')).toHaveTextContent('2');
      expect(screen.getByTestId('skills-titles')).toHaveTextContent('React,Vue');
    });

    it('should filter by exchange type', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FilteredSkillsTestComponent />, {
        preloadedState: {
          users: { items: mockUsers, currentUser: null, isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Filter Teach' }));

      expect(screen.getByTestId('skills-count')).toHaveTextContent('2');
      expect(screen.getByTestId('skills-titles')).toHaveTextContent('React,Guitar');
    });

    it('should filter by gender', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FilteredSkillsTestComponent />, {
        preloadedState: {
          users: { items: mockUsers, currentUser: null, isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Filter Female' }));

      expect(screen.getByTestId('skills-count')).toHaveTextContent('1');
      expect(screen.getByTestId('skills-titles')).toHaveTextContent('Guitar');
    });

    it('should filter by city', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FilteredSkillsTestComponent />, {
        preloadedState: {
          users: { items: mockUsers, currentUser: null, isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Filter City' }));

      expect(screen.getByTestId('skills-count')).toHaveTextContent('2');
      expect(screen.getByTestId('skills-titles')).toHaveTextContent('React,Vue');
    });

    it('should filter by search value (title)', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FilteredSkillsTestComponent />, {
        preloadedState: {
          users: { items: mockUsers, currentUser: null, isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Filter Search' }));

      expect(screen.getByTestId('skills-count')).toHaveTextContent('1');
      expect(screen.getByTestId('skills-titles')).toHaveTextContent('Guitar');
    });

    it('should combine filters by AND', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FilteredSkillsTestComponent />, {
        preloadedState: {
          users: { items: mockUsers, currentUser: null, isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Filter Cat' }));
      await user.click(screen.getByRole('button', { name: 'Filter Teach' }));

      expect(screen.getByTestId('skills-count')).toHaveTextContent('1');
      expect(screen.getByTestId('skills-titles')).toHaveTextContent('React');
    });

    it('should reset filters and show all skills', async () => {
      const user = userEvent.setup();
      renderWithProviders(<FilteredSkillsTestComponent />, {
        preloadedState: {
          users: { items: mockUsers, currentUser: null, isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Filter Cat' }));
      expect(screen.getByTestId('skills-count')).toHaveTextContent('2');

      await user.click(screen.getByRole('button', { name: 'Reset Filters' }));
      expect(screen.getByTestId('skills-count')).toHaveTextContent('3');
      expect(screen.getByTestId('skills-titles')).toHaveTextContent('React,Vue,Guitar');
    });
  });
});
