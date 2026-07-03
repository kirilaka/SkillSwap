// integration test
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchUsersThunk,
  fetchUserByIdThunk,
  clearUsersError,
  clearCurrentUser,
  selectUsers,
  selectCurrentUser,
  selectUsersLoading,
  selectUsersError,
} from './usersSlice';
import * as usersApi from '@/api/users';
import type { UserInfo } from '@/shared/types';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProvider';

vi.mock('@/api/users');

const mockUser: UserInfo = {
  id: 'user-1',
  name: 'Test User',
  email: 'test@test.com',
  avatarUrl: null,
  createdAt: '2024-01-01',
  city: 'Moscow',
  age: 30,
  gender: 'male',
  description: 'Test description',
};

const mockUser2: UserInfo = {
  id: 'user-2',
  name: 'Second User',
  email: 'second@test.com',
  avatarUrl: null,
  createdAt: '2024-01-02',
};

// ─── Тестовые компоненты ─────────────────────────────────────────

function UsersTestComponent() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);

  return (
    <div>
      <div data-testid="users-count">{users.length}</div>
      <div data-testid="current-user">{currentUser?.name ?? 'null'}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="error">{error ?? 'null'}</div>
      <button onClick={() => dispatch(fetchUsersThunk())}>Fetch Users</button>
      <button onClick={() => dispatch(fetchUserByIdThunk('user-1'))}>Fetch By Id</button>
      <button onClick={() => dispatch(clearUsersError())}>Clear Error</button>
      <button onClick={() => dispatch(clearCurrentUser())}>Clear Current</button>
    </div>
  );
}

// ─── Tests ─────────────────────────────────────────────────────────

describe('usersSlice with renderWithProviders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should render correct initial state', () => {
      renderWithProviders(<UsersTestComponent />);

      expect(screen.getByTestId('users-count')).toHaveTextContent('0');
      expect(screen.getByTestId('current-user')).toHaveTextContent('null');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });
  });

  describe('fetchUsersThunk', () => {
    it('should fetch and display users', async () => {
      const user = userEvent.setup();
      vi.mocked(usersApi.fetchUsers).mockResolvedValue([mockUser, mockUser2]);

      renderWithProviders(<UsersTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch Users' }));

      expect(screen.getByTestId('users-count')).toHaveTextContent('2');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    it('should handle rejected', async () => {
      const user = userEvent.setup();
      vi.mocked(usersApi.fetchUsers).mockRejectedValue(new Error('Network error'));

      renderWithProviders(<UsersTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch Users' }));

      expect(screen.getByTestId('error')).toHaveTextContent('Network error');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  describe('fetchUserByIdThunk', () => {
    it('fulfilled: should set currentUser', async () => {
      const user = userEvent.setup();
      vi.mocked(usersApi.fetchUserById).mockResolvedValue(mockUser);

      renderWithProviders(<UsersTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));

      expect(screen.getByTestId('current-user')).toHaveTextContent('Test User');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    it('fulfilled: should set null if user not found', async () => {
      const user = userEvent.setup();
      vi.mocked(usersApi.fetchUserById).mockResolvedValue(undefined as unknown as UserInfo);

      renderWithProviders(<UsersTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));

      expect(screen.getByTestId('current-user')).toHaveTextContent('null');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    it('rejected: should set error', async () => {
      const user = userEvent.setup();
      vi.mocked(usersApi.fetchUserById).mockRejectedValue(new Error('Not found'));

      renderWithProviders(<UsersTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));

      expect(screen.getByTestId('error')).toHaveTextContent('Not found');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });
  });

  describe('reducer actions', () => {
    it('clearUsersError should reset error', async () => {
      const user = userEvent.setup();
      vi.mocked(usersApi.fetchUsers).mockRejectedValue(new Error('Fail'));

      renderWithProviders(<UsersTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch Users' }));
      expect(screen.getByTestId('error')).toHaveTextContent('Fail');

      await user.click(screen.getByRole('button', { name: 'Clear Error' }));
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });

    it('clearCurrentUser should reset currentUser', async () => {
      const user = userEvent.setup();
      vi.mocked(usersApi.fetchUserById).mockResolvedValue(mockUser);

      renderWithProviders(<UsersTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Fetch By Id' }));
      expect(screen.getByTestId('current-user')).toHaveTextContent('Test User');

      await user.click(screen.getByRole('button', { name: 'Clear Current' }));
      expect(screen.getByTestId('current-user')).toHaveTextContent('null');
    });
  });

  describe('selectors through useAppSelector', () => {
    it('should render user found by inline filter', () => {
      function UserByIdComponent() {
        const users = useAppSelector(selectUsers);
        const found = users.find((u) => u.id === 'user-1');
        return <div data-testid="user-by-id">{found?.name ?? 'null'}</div>;
      }

      renderWithProviders(<UserByIdComponent />, {
        preloadedState: {
          users: {
            items: [mockUser, mockUser2],
            currentUser: null,
            isLoading: false,
            error: null,
          },
        },
      });

      expect(screen.getByTestId('user-by-id')).toHaveTextContent('Test User');
    });
  });
});
