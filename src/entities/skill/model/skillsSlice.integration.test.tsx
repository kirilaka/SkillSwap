// Интеграционное тестирование через renderWithProviders + React-компоненты
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
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
} from './skillsSlice';
import * as skillsApi from '@/api/skills';
import * as storage from '@/shared/lib/localStorage/CreatedSkillsStorage';
import type { Skill } from '@/shared/types';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProvider';

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

// ─── Тестовые компоненты ─────────────────────────────────────────

function SkillsTestComponent() {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(selectSkills);
  const currentSkill = useAppSelector(selectCurrentSkill);
  const isLoading = useAppSelector(selectSkillsLoading);
  const error = useAppSelector(selectSkillsError);

  return (
    <div>
      <div data-testid="skills-count">{skills.length}</div>
      <div data-testid="current-skill">{currentSkill?.title ?? 'null'}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="error">{error ?? 'null'}</div>
      <button onClick={() => dispatch(fetchSkillsThunk())}>Fetch Skills</button>
      <button onClick={() => dispatch(fetchSkillByIdThunk('skill-1'))}>Fetch By Id</button>
      <button onClick={() => dispatch(clearSkillsError())}>Clear Error</button>
      <button onClick={() => dispatch(clearCurrentSkill())}>Clear Current</button>
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
      <div data-testid="error">{error ?? 'null'}</div>
      <button
        onClick={() =>
          dispatch(
            updateSkillThunk({
              skillId: 'skill-created-1',
              updates: { title: 'Updated' },
              currentUserId: 'user1',
            }),
          )
        }
      >
        Update
      </button>
      <button
        onClick={() =>
          dispatch(deleteSkillThunk({ skillId: 'skill-created-1', currentUserId: 'user1' }))
        }
      >
        Delete
      </button>
    </div>
  );
}

// ─── Tests ─────────────────────────────────────────────────────────

describe('skillsSlice with renderWithProviders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      renderWithProviders(<SkillsTestComponent />);

      expect(screen.getByTestId('skills-count')).toHaveTextContent('0');
      expect(screen.getByTestId('current-skill')).toHaveTextContent('null');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });
  });

  describe('fetchSkillsThunk', () => {
    it('should merge mock and created skills', async () => {
      const user = userEvent.setup();
      vi.mocked(skillsApi.fetchSkills).mockResolvedValue([mockSkill]);
      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([createdSkill]);

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch Skills' }));

      expect(screen.getByTestId('skills-count')).toHaveTextContent('2');
    });

    it('should handle rejected', async () => {
      const user = userEvent.setup();
      vi.mocked(skillsApi.fetchSkills).mockRejectedValue(new Error('Network error'));

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch Skills' }));

      expect(screen.getByTestId('error')).toHaveTextContent('Network error');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  describe('fetchSkillByIdThunk', () => {
    it('fulfilled: should set currentSkill', async () => {
      const user = userEvent.setup();
      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(mockSkill);

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));

      expect(screen.getByTestId('current-skill')).toHaveTextContent('React');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    it('fulfilled: should set null if skill not found', async () => {
      const user = userEvent.setup();
      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(undefined as unknown as Skill);

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));

      expect(screen.getByTestId('current-skill')).toHaveTextContent('null');
    });

    it('rejected: should set error', async () => {
      const user = userEvent.setup();
      vi.mocked(skillsApi.fetchSkillById).mockRejectedValue(new Error('Not found'));

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));

      expect(screen.getByTestId('error')).toHaveTextContent('Not found');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  describe('createSkillThunk', () => {
    it('should create skill with source created', async () => {
      const user = userEvent.setup();
      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([]);
      vi.spyOn(storage, 'saveCreatedSkillsToStorage').mockImplementation(() => {});

      function CreateTestComponent() {
        const dispatch = useAppDispatch();
        const skills = useAppSelector(selectSkills);

        return (
          <div>
            <div data-testid="count">{skills.length}</div>
            <button
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

      renderWithProviders(<CreateTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Create' }));

      expect(screen.getByTestId('count')).toHaveTextContent('1');
      expect(storage.saveCreatedSkillsToStorage).toHaveBeenCalled();
    });
  });

  describe('updateSkillThunk', () => {
    it('should update own created skill', async () => {
      const user = userEvent.setup();
      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([
        { ...createdSkill, authorId: 'user1' },
      ]);
      vi.spyOn(storage, 'saveCreatedSkillsToStorage').mockImplementation(() => {});

      renderWithProviders(<UpdateDeleteTestComponent />, {
        preloadedState: {
          skills: {
            items: [{ ...createdSkill, authorId: 'user1' }],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Update' }));

      expect(screen.getByTestId('skills-count')).toHaveTextContent('1');
      expect(storage.saveCreatedSkillsToStorage).toHaveBeenCalled();
    });

    it('should reject updating other user skill', async () => {
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

      expect(screen.getByTestId('error')).toHaveTextContent('Not authorized');
    });

    it('should reject updating mock skill', async () => {
      const user = userEvent.setup();

      function UpdateMockTestComponent() {
        const dispatch = useAppDispatch();
        const error = useAppSelector(selectSkillsError);

        return (
          <div>
            <div data-testid="error">{error ?? 'null'}</div>
            <button
              onClick={() =>
                dispatch(
                  updateSkillThunk({
                    skillId: 'skill-1',
                    updates: { title: 'Hacked' },
                    currentUserId: 'user1',
                  }),
                )
              }
            >
              Update Mock
            </button>
          </div>
        );
      }

      renderWithProviders(<UpdateMockTestComponent />, {
        preloadedState: {
          skills: {
            items: [mockSkill],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Update Mock' }));

      expect(screen.getByTestId('error')).toHaveTextContent('Cannot edit mock skills');
    });
  });

  describe('deleteSkillThunk', () => {
    it('should delete own created skill', async () => {
      const user = userEvent.setup();
      vi.spyOn(storage, 'getCreatedSkillsFromStorage').mockReturnValue([
        { ...createdSkill, authorId: 'user1' },
      ]);
      vi.spyOn(storage, 'saveCreatedSkillsToStorage').mockImplementation(() => {});

      renderWithProviders(<UpdateDeleteTestComponent />, {
        preloadedState: {
          skills: {
            items: [{ ...createdSkill, authorId: 'user1' }],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      expect(screen.getByTestId('skills-count')).toHaveTextContent('0');
      expect(storage.saveCreatedSkillsToStorage).toHaveBeenCalled();
    });

    it('should reject deleting other user skill', async () => {
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

      expect(screen.getByTestId('error')).toHaveTextContent('Not authorized');
    });

    it('should reject deleting mock skill', async () => {
      const user = userEvent.setup();

      function DeleteMockTestComponent() {
        const dispatch = useAppDispatch();
        const error = useAppSelector(selectSkillsError);

        return (
          <div>
            <div data-testid="error">{error ?? 'null'}</div>
            <button
              onClick={() =>
                dispatch(
                  deleteSkillThunk({
                    skillId: 'skill-1',
                    currentUserId: 'user1',
                  }),
                )
              }
            >
              Delete Mock
            </button>
          </div>
        );
      }

      renderWithProviders(<DeleteMockTestComponent />, {
        preloadedState: {
          skills: {
            items: [mockSkill],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Delete Mock' }));

      expect(screen.getByTestId('error')).toHaveTextContent('Cannot delete mock skills');
    });
  });

  describe('reducer actions', () => {
    it('clearSkillsError should reset error', async () => {
      const user = userEvent.setup();
      vi.mocked(skillsApi.fetchSkills).mockRejectedValue(new Error('Fail'));

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch Skills' }));
      expect(screen.getByTestId('error')).toHaveTextContent('Fail');

      await user.click(screen.getByRole('button', { name: 'Clear Error' }));
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });

    it('clearCurrentSkill should reset currentSkill', async () => {
      const user = userEvent.setup();
      vi.mocked(skillsApi.fetchSkillById).mockResolvedValue(mockSkill);

      renderWithProviders(<SkillsTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));
      expect(screen.getByTestId('current-skill')).toHaveTextContent('React');

      await user.click(screen.getByRole('button', { name: 'Clear Current' }));
      expect(screen.getByTestId('current-skill')).toHaveTextContent('null');
    });
  });

  describe('selectors', () => {
    it('selectSkillById should find skill by id', () => {
      function SkillByIdComponent() {
        const skill = useAppSelector(selectSkillById('skill-1'));
        return <div data-testid="skill">{skill?.title ?? 'null'}</div>;
      }

      renderWithProviders(<SkillByIdComponent />, {
        preloadedState: {
          skills: {
            items: [mockSkill],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      expect(screen.getByTestId('skill')).toHaveTextContent('React');
    });

    it('selectSkillsByAuthorId should filter by author', () => {
      function AuthorSelectorComponent() {
        const skills = useAppSelector(selectSkills);
        const byAuthor = skills.filter((s) => s.authorId === 'user1');
        return <div data-testid="by-author">{byAuthor.length}</div>;
      }

      renderWithProviders(<AuthorSelectorComponent />, {
        preloadedState: {
          skills: {
            items: [
              { ...mockSkill, authorId: 'user1' },
              { ...mockSkill, id: 'skill-2', authorId: 'user2' },
            ],
            currentSkill: null,
            isLoading: false,
            error: null,
          },
        },
      });

      expect(screen.getByTestId('by-author')).toHaveTextContent('1');
    });

    it('selectCurrentUserSkills should return empty if no user', () => {
      function CurrentUserSkillsComponent() {
        const skills = useAppSelector(selectSkills);
        const currentUser = useAppSelector((state) => state.auth.user);
        const userSkills = currentUser ? skills.filter((s) => s.authorId === currentUser.id) : [];
        return <div data-testid="current-user">{userSkills.length}</div>;
      }

      renderWithProviders(<CurrentUserSkillsComponent />);

      expect(screen.getByTestId('current-user')).toHaveTextContent('0');
    });

    it('selectCurrentUserSkills should return skills for authenticated user', () => {
      function CurrentUserSkillsComponent() {
        const skills = useAppSelector(selectSkills);
        const currentUser = useAppSelector((state) => state.auth.user);
        const userSkills = currentUser ? skills.filter((s) => s.authorId === currentUser.id) : [];
        return <div data-testid="current-user">{userSkills.length}</div>;
      }

      renderWithProviders(<CurrentUserSkillsComponent />, {
        preloadedState: {
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
          auth: {
            user: {
              id: 'user1',
              name: 'Test',
              email: 'test@test.com',
              avatarUrl: null,
              createdAt: '',
              description: '',
              gender: 'male',
              age: 25,
              city: 'Moscow',
            },
            token: 'token123',
            isAuth: true,
            isLoading: false,
            error: null,
          },
        },
      });

      expect(screen.getByTestId('current-user')).toHaveTextContent('2');
    });
  });
});
