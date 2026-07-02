// Интеграционное тестирование skillsSlice через renderWithProviders + React-компоненты
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
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
import { renderWithProviders } from '@/shared/lib/tests/renderWithProvider';
import type { GenderType } from '@/shared/types';

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

const anotherSkill: Skill = {
  ...mockSkill,
  id: 'skill-2',
  title: 'Node.js',
  authorId: 'user2',
};

const authenticatedUserState = {
  user: {
    id: 'user1',
    name: 'Test',
    email: 'test@test.com',
    avatarUrl: null,
    createdAt: '',
    description: '',
    gender: 'male' as GenderType,
    age: 25,
    city: 'Moscow',
  },
  token: 'token123',
  isAuth: true,
  isLoading: false,
  error: null,
};

function SkillsTestComponent() {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(selectSkills);
  const currentSkill = useAppSelector(selectCurrentSkill);
  const isLoading = useAppSelector(selectSkillsLoading);
  const error = useAppSelector(selectSkillsError);

  return (
    <div>
      <div data-testid="skills-count">{skills.length}</div>
      <div data-testid="skills-titles">{skills.map((skill) => skill.title).join(', ')}</div>
      <div data-testid="current-skill">{currentSkill?.title ?? 'null'}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="error">{error ?? 'null'}</div>

      <button type="button" onClick={() => dispatch(fetchSkillsThunk())}>
        Fetch Skills
      </button>
      <button type="button" onClick={() => dispatch(fetchSkillByIdThunk('skill-1'))}>
        Fetch By Id
      </button>
      <button type="button" onClick={() => dispatch(clearSkillsError())}>
        Clear Error
      </button>
      <button type="button" onClick={() => dispatch(clearCurrentSkill())}>
        Clear Current
      </button>
    </div>
  );
}

function CreateSkillTestComponent() {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(selectSkills);

  const lastSkill = skills.at(-1);

  return (
    <div>
      <div data-testid="skills-count">{skills.length}</div>
      <div data-testid="last-skill-title">{lastSkill?.title ?? 'null'}</div>
      <div data-testid="last-skill-source">{lastSkill?.source ?? 'null'}</div>
      <div data-testid="last-skill-author">{lastSkill?.authorId ?? 'null'}</div>

      <button
        type="button"
        onClick={() =>
          dispatch(
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
          )
        }
      >
        Create
      </button>
    </div>
  );
}

function UpdateDeleteTestComponent() {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(selectSkills);
  const error = useAppSelector(selectSkillsError);

  return (
    <div>
      <div data-testid="skills-count">{skills.length}</div>
      <div data-testid="first-skill-title">{skills[0]?.title ?? 'null'}</div>
      <div data-testid="error">{error ?? 'null'}</div>

      <button
        type="button"
        onClick={() =>
          dispatch(
            updateSkillThunk({
              skillId: 'skill-created-1',
              updates: { title: 'Updated Vue' },
              currentUserId: 'user1',
            }),
          )
        }
      >
        Update
      </button>
      <button
        type="button"
        onClick={() =>
          dispatch(deleteSkillThunk({ skillId: 'skill-created-1', currentUserId: 'user1' }))
        }
      >
        Delete
      </button>
    </div>
  );
}

function SelectorTestComponent() {
  const skillById = useAppSelector(selectSkillById('skill-1'));
  const user1Skills = useAppSelector(selectSkillsByAuthorId('user1'));
  const currentUserSkills = useAppSelector(selectCurrentUserSkills);

  return (
    <div>
      <div data-testid="skill-by-id">{skillById?.title ?? 'null'}</div>
      <div data-testid="by-author-count">{user1Skills.length}</div>
      <div data-testid="current-user-count">{currentUserSkills.length}</div>
    </div>
  );
}

describe('skillsSlice with renderWithProviders', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should render correct initial state from store', () => {
      renderWithProviders(<SkillsTestComponent />);

      expect(screen.getByTestId('skills-count')).toHaveTextContent('0');
      expect(screen.getByTestId('skills-titles')).toHaveTextContent('');
      expect(screen.getByTestId('current-skill')).toHaveTextContent('null');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });
  });

  describe('fetchSkillsThunk', () => {
    it('should fetch skills and render merged mock + created skills', async () => {
      const user = userEvent.setup();

      vi.mocked(skillsApi.fetchSkills).mockResolvedValue([mockSkill]);
      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([createdSkill]);

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch Skills' }));

      await waitFor(() => {
        expect(screen.getByTestId('skills-count')).toHaveTextContent('2');
      });

      expect(screen.getByTestId('skills-titles')).toHaveTextContent('React, Vue');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });

    it('should render error if fetchSkillsThunk is rejected', async () => {
      const user = userEvent.setup();

      vi.mocked(skillsApi.fetchSkills).mockRejectedValue(new Error('Network error'));

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch Skills' }));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Network error');
      });

      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  describe('fetchSkillByIdThunk', () => {
    it('should fetch skill by id and render currentSkill', async () => {
      const user = userEvent.setup();

      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(mockSkill);

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));

      await waitFor(() => {
        expect(screen.getByTestId('current-skill')).toHaveTextContent('React');
      });

      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });

    it('should render null if skill by id is not found', async () => {
      const user = userEvent.setup();

      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(undefined as unknown as Skill);

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));

      await waitFor(() => {
        expect(screen.getByTestId('current-skill')).toHaveTextContent('null');
      });
    });

    it('should render error if fetchSkillByIdThunk is rejected', async () => {
      const user = userEvent.setup();

      vi.mocked(skillsApi.fetchSkillById).mockRejectedValue(new Error('Not found'));

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Not found');
      });

      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  describe('createSkillThunk', () => {
    it('should create skill and render created skill data', async () => {
      const user = userEvent.setup();

      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([]);
      vi.spyOn(storage, 'saveCreatedSkillsToStorage').mockImplementation(() => {});

      renderWithProviders(<CreateSkillTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Create' }));

      await waitFor(() => {
        expect(screen.getByTestId('skills-count')).toHaveTextContent('1');
      });

      expect(screen.getByTestId('last-skill-title')).toHaveTextContent('New Skill');
      expect(screen.getByTestId('last-skill-source')).toHaveTextContent('created');
      expect(screen.getByTestId('last-skill-author')).toHaveTextContent('user1');
      expect(storage.saveCreatedSkillsToStorage).toHaveBeenCalledWith([
        expect.objectContaining({
          title: 'New Skill',
          source: 'created',
          authorId: 'user1',
        }),
      ]);
    });
  });

  describe('updateSkillThunk', () => {
    it('should update own created skill and render updated title', async () => {
      const user = userEvent.setup();
      const myCreatedSkill = { ...createdSkill, authorId: 'user1' };

      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([myCreatedSkill]);
      vi.spyOn(storage, 'saveCreatedSkillsToStorage').mockImplementation(() => {});

      renderWithProviders(<UpdateDeleteTestComponent />, {
        preloadedState: {
          skills: {
            items: [myCreatedSkill],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Update' }));

      await waitFor(() => {
        expect(screen.getByTestId('first-skill-title')).toHaveTextContent('Updated Vue');
      });

      expect(screen.getByTestId('skills-count')).toHaveTextContent('1');
      expect(storage.saveCreatedSkillsToStorage).toHaveBeenCalledWith([
        expect.objectContaining({
          id: 'skill-created-1',
          title: 'Updated Vue',
          authorId: 'user1',
        }),
      ]);
    });

    it('should render error and keep data when user tries to update other user skill', async () => {
      const user = userEvent.setup();

      renderWithProviders(<UpdateDeleteTestComponent />, {
        preloadedState: {
          skills: {
            items: [{ ...createdSkill, authorId: 'user2' }],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Update' }));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Not authorized');
      });

      expect(screen.getByTestId('first-skill-title')).toHaveTextContent('Vue');
    });

    it('should render error and keep data when user tries to update mock skill', async () => {
      const user = userEvent.setup();

      const mockSkillWithTargetId = {
        ...mockSkill,
        id: 'skill-created-1',
        source: 'mock' as const,
      };

      renderWithProviders(<UpdateDeleteTestComponent />, {
        preloadedState: {
          skills: {
            items: [mockSkillWithTargetId],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Update' }));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Cannot edit mock skills');
      });

      expect(screen.getByTestId('first-skill-title')).toHaveTextContent('React');
    });
  });

  describe('deleteSkillThunk', () => {
    it('should delete own created skill and render empty list', async () => {
      const user = userEvent.setup();
      const myCreatedSkill = { ...createdSkill, authorId: 'user1' };

      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([myCreatedSkill]);
      vi.spyOn(storage, 'saveCreatedSkillsToStorage').mockImplementation(() => {});

      renderWithProviders(<UpdateDeleteTestComponent />, {
        preloadedState: {
          skills: {
            items: [myCreatedSkill],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      await waitFor(() => {
        expect(screen.getByTestId('skills-count')).toHaveTextContent('0');
      });

      expect(screen.getByTestId('first-skill-title')).toHaveTextContent('null');
      expect(storage.saveCreatedSkillsToStorage).toHaveBeenCalledWith([]);
    });

    it('should render error and keep data when user tries to delete other user skill', async () => {
      const user = userEvent.setup();

      renderWithProviders(<UpdateDeleteTestComponent />, {
        preloadedState: {
          skills: {
            items: [{ ...createdSkill, authorId: 'user2' }],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Not authorized');
      });

      expect(screen.getByTestId('skills-count')).toHaveTextContent('1');
      expect(screen.getByTestId('first-skill-title')).toHaveTextContent('Vue');
    });

    it('should render error and keep data when user tries to delete mock skill', async () => {
      const user = userEvent.setup();

      const mockSkillWithTargetId = {
        ...mockSkill,
        id: 'skill-created-1',
        source: 'mock' as const,
      };

      renderWithProviders(<UpdateDeleteTestComponent />, {
        preloadedState: {
          skills: {
            items: [mockSkillWithTargetId],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Cannot delete mock skills');
      });

      expect(screen.getByTestId('skills-count')).toHaveTextContent('1');
      expect(screen.getByTestId('first-skill-title')).toHaveTextContent('React');
    });
  });

  describe('reducer actions through component dispatch', () => {
    it('clearSkillsError should reset rendered error', async () => {
      const user = userEvent.setup();

      vi.mocked(skillsApi.fetchSkills).mockRejectedValue(new Error('Fail'));

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch Skills' }));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Fail');
      });

      await user.click(screen.getByRole('button', { name: 'Clear Error' }));

      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });

    it('clearCurrentSkill should reset rendered currentSkill', async () => {
      const user = userEvent.setup();

      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(mockSkill);

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));

      await waitFor(() => {
        expect(screen.getByTestId('current-skill')).toHaveTextContent('React');
      });

      await user.click(screen.getByRole('button', { name: 'Clear Current' }));

      expect(screen.getByTestId('current-skill')).toHaveTextContent('null');
    });
  });

  describe('selectors through useAppSelector', () => {
    it('should render skill found by selectSkillById', () => {
      renderWithProviders(<SelectorTestComponent />, {
        preloadedState: {
          skills: {
            items: [mockSkill],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      expect(screen.getByTestId('skill-by-id')).toHaveTextContent('React');
    });

    it('should render skills count filtered by selectSkillsByAuthorId', () => {
      renderWithProviders(<SelectorTestComponent />, {
        preloadedState: {
          skills: {
            items: [mockSkill, anotherSkill],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      expect(screen.getByTestId('by-author-count')).toHaveTextContent('1');
    });

    it('should render empty current user skills if user is not authenticated', () => {
      renderWithProviders(<SelectorTestComponent />, {
        preloadedState: {
          skills: {
            items: [mockSkill, anotherSkill],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      expect(screen.getByTestId('current-user-count')).toHaveTextContent('0');
    });

    it('should render current user skills from selectCurrentUserSkills', () => {
      renderWithProviders(<SelectorTestComponent />, {
        preloadedState: {
          skills: {
            items: [
              { ...mockSkill, authorId: 'user1' },
              { ...mockSkill, id: 'skill-2', title: 'Angular', authorId: 'user2' },
              { ...mockSkill, id: 'skill-3', title: 'TypeScript', authorId: 'user1' },
            ],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
          auth: authenticatedUserState,
        },
      });

      expect(screen.getByTestId('current-user-count')).toHaveTextContent('2');
    });
  });
});
