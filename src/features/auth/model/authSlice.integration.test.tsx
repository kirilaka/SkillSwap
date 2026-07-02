// integration test
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  loginThunk,
  registerThunk,
  checkAuthThunk,
  logout,
  clearAuthError,
  selectAuthUser,
  selectAuthToken,
  selectIsAuth,
  selectAuthLoading,
  selectAuthError,
  selectAuthUserId,
} from './authSlice';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProvider';

vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    } as Response),
  ),
);

const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>;

const mockUser = {
  id: 'user-mock-1',
  name: 'Mock User',
  email: 'mock@test.com',
  avatarUrl: null,
  createdAt: '2024-01-01',
  city: 'Moscow',
  age: 25,
  gender: 'male',
  description: 'Mock description',
};

// ─── Тестовые компоненты ─────────────────────────────────────────

function AuthTestComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const isAuth = useAppSelector(selectIsAuth);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const token = useAppSelector(selectAuthToken);

  return (
    <div>
      <div data-testid="user-name">{user?.name ?? 'null'}</div>
      <div data-testid="is-auth">{isAuth.toString()}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="error">{error ?? 'null'}</div>
      <div data-testid="token">{token ?? 'null'}</div>
      <button onClick={() => dispatch(loginThunk('mock@test.com'))}>Login</button>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <button onClick={() => dispatch(clearAuthError())}>Clear Error</button>
    </div>
  );
}

function RegisterTestComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const isAuth = useAppSelector(selectIsAuth);
  const error = useAppSelector(selectAuthError);

  return (
    <div>
      <div data-testid="user-name">{user?.name ?? 'null'}</div>
      <div data-testid="is-auth">{isAuth.toString()}</div>
      <div data-testid="error">{error ?? 'null'}</div>
      <button
        onClick={() =>
          dispatch(
            registerThunk({
              name: 'New User',
              email: 'new@test.com',
              gender: 'female',
            }),
          )
        }
      >
        Register
      </button>
    </div>
  );
}

function RegisterDuplicateComponent() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);

  return (
    <div>
      <div data-testid="error">{error ?? 'null'}</div>
      <button
        onClick={() =>
          dispatch(
            registerThunk({
              name: 'Duplicate',
              email: 'mock@test.com',
              gender: 'male',
            }),
          )
        }
      >
        Register Duplicate
      </button>
    </div>
  );
}

function CheckAuthTestComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const isAuth = useAppSelector(selectIsAuth);
  const userId = useAppSelector(selectAuthUserId);

  return (
    <div>
      <div data-testid="user-name">{user?.name ?? 'null'}</div>
      <div data-testid="is-auth">{isAuth.toString()}</div>
      <div data-testid="user-id">{userId ?? 'null'}</div>
      <button onClick={() => dispatch(checkAuthThunk())}>Check Auth</button>
    </div>
  );
}

// ─── Tests ─────────────────────────────────────────────────────────

describe('authSlice with renderWithProviders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      renderWithProviders(<AuthTestComponent />);

      expect(screen.getByTestId('user-name')).toHaveTextContent('null');
      expect(screen.getByTestId('is-auth')).toHaveTextContent('false');
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('error')).toHaveTextContent('null');
      expect(screen.getByTestId('token')).toHaveTextContent('null');
    });
  });

  describe('loginThunk', () => {
    it('should login mock user successfully', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockUser]),
      } as Response);

      renderWithProviders(<AuthTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Login' }));

      expect(screen.getByTestId('user-name')).toHaveTextContent('Mock User');
      expect(screen.getByTestId('is-auth')).toHaveTextContent('true');
      expect(screen.getByTestId('token')).toHaveTextContent('token123');
    });

    it('should reject if email not found', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      } as Response);

      renderWithProviders(<AuthTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Login' }));

      expect(screen.getByTestId('error')).toHaveTextContent('Пользователь не найден');
      expect(screen.getByTestId('is-auth')).toHaveTextContent('false');
    });
  });

  describe('registerThunk', () => {
    it('should create new user', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      } as Response);

      renderWithProviders(<RegisterTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Register' }));

      expect(screen.getByTestId('user-name')).toHaveTextContent('New User');
      expect(screen.getByTestId('is-auth')).toHaveTextContent('true');
    });

    it('should reject duplicate email', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockUser]),
      } as Response);

      // Только компонент с дублирующим email — без лишнего RegisterTestComponent
      renderWithProviders(<RegisterDuplicateComponent />);

      await user.click(screen.getByRole('button', { name: 'Register Duplicate' }));

      expect(screen.getByTestId('error')).toHaveTextContent(
        'Пользователь с таким email уже существует',
      );
    });
  });

  describe('checkAuthThunk', () => {
    it('should restore user from localStorage', async () => {
      const user = userEvent.setup();
      localStorage.setItem('token', 'token123');
      localStorage.setItem('userId', 'user-mock-1');

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockUser]),
      } as Response);

      renderWithProviders(<CheckAuthTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Check Auth' }));

      expect(screen.getByTestId('user-name')).toHaveTextContent('Mock User');
      expect(screen.getByTestId('is-auth')).toHaveTextContent('true');
      expect(screen.getByTestId('user-id')).toHaveTextContent('user-mock-1');
    });

    it('should reset auth if userId not found', async () => {
      const user = userEvent.setup();
      localStorage.setItem('token', 'token123');
      localStorage.setItem('userId', 'non-existent');

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockUser]),
      } as Response);

      renderWithProviders(<CheckAuthTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Check Auth' }));

      expect(screen.getByTestId('user-name')).toHaveTextContent('null');
      expect(screen.getByTestId('is-auth')).toHaveTextContent('false');
      expect(screen.getByTestId('user-id')).toHaveTextContent('null');
    });
  });

  describe('logout', () => {
    it('should clear auth state', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([mockUser]),
      } as Response);

      renderWithProviders(<AuthTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Login' }));
      expect(screen.getByTestId('is-auth')).toHaveTextContent('true');

      await user.click(screen.getByRole('button', { name: 'Logout' }));
      expect(screen.getByTestId('is-auth')).toHaveTextContent('false');
      expect(screen.getByTestId('user-name')).toHaveTextContent('null');
      expect(screen.getByTestId('token')).toHaveTextContent('null');
    });
  });

  describe('reducer actions', () => {
    it('clearAuthError should reset error', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      } as Response);

      renderWithProviders(<AuthTestComponent />);

      await user.click(screen.getByRole('button', { name: 'Login' }));
      expect(screen.getByTestId('error')).toHaveTextContent('Пользователь не найден');

      await user.click(screen.getByRole('button', { name: 'Clear Error' }));
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });
  });
});
