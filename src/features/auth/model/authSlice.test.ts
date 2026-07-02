// unit test
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  loginThunk,
  registerThunk,
  checkAuthThunk,
  logout,
  clearAuthError,
  setAuthUser,
  updateAuthUser,
  selectAuthUser,
  selectAuthToken,
  selectIsAuth,
  selectAuthLoading,
  selectAuthError,
  selectAuthUserId,
} from './authSlice';
import type { User, UserInfo } from '@/shared/types';

// ─── Mocks ─────────────────────────────────────────────────────────

const mockUsers: UserInfo[] = [
  {
    id: 'user-mock-1',
    name: 'Mock User',
    email: 'mock@test.com',
    avatarUrl: null,
    createdAt: '2024-01-01',
    city: 'Moscow',
    age: 25,
    gender: 'male',
    description: 'Mock description',
  },
];

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// ─── Helpers ───────────────────────────────────────────────────────

const createTestStore = () =>
  configureStore({
    reducer: { auth: authReducer },
  });

type TestStore = ReturnType<typeof createTestStore>;

// ─── Tests ───────────────────────────────────────────────────────────

describe('authSlice', () => {
  let store: TestStore;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState();
      expect(state.auth.user).toBeNull();
      expect(state.auth.token).toBeNull();
      expect(state.auth.isAuth).toBe(false);
      expect(state.auth.isLoading).toBe(false);
      expect(state.auth.error).toBeNull();
    });
  });

  // ─── loginThunk ─────────────────────────────────────────────

  describe('loginThunk', () => {
    it('should login mock user successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      await store.dispatch(loginThunk('mock@test.com'));

      expect(selectAuthUser(store.getState())?.email).toBe('mock@test.com');
      expect(selectIsAuth(store.getState())).toBe(true);
      expect(selectAuthToken(store.getState())).toBe('token123');
      expect(localStorage.getItem('token')).toBe('token123');
      expect(localStorage.getItem('userId')).toBe('user-mock-1');
    });

    it('should login registered user from localStorage', async () => {
      const registeredUser: UserInfo = {
        id: 'user-reg-1',
        name: 'Registered',
        email: 'reg@test.com',
        avatarUrl: null,
        createdAt: '2024-01-01',
      };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      // Сохраняем в localStorage до вызова
      localStorage.setItem('registeredUsers', JSON.stringify([registeredUser]));

      await store.dispatch(loginThunk('reg@test.com'));

      expect(selectAuthUser(store.getState())?.email).toBe('reg@test.com');
      expect(selectIsAuth(store.getState())).toBe(true);
    });

    it('should reject if email not found', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      await store.dispatch(loginThunk('nonexistent@test.com'));

      expect(selectAuthError(store.getState())).toBe('Пользователь не найден');
      expect(selectIsAuth(store.getState())).toBe(false);
    });
  });

  // ─── registerThunk ──────────────────────────────────────────

  describe('registerThunk', () => {
    it('should create new user', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      } as Response);

      await store.dispatch(
        registerThunk({
          name: 'New User',
          email: 'new@test.com',
          gender: 'female',
          city: 'SPb',
          age: 30,
        }),
      );

      const user = selectAuthUser(store.getState());
      expect(user?.email).toBe('new@test.com');
      expect(user?.name).toBe('New User');
      expect(selectIsAuth(store.getState())).toBe(true);
      expect(selectAuthToken(store.getState())).toBe('token123');
    });

    it('should reject duplicate email', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      await store.dispatch(
        registerThunk({
          name: 'Duplicate',
          email: 'mock@test.com',
          gender: 'male',
        }),
      );

      expect(selectAuthError(store.getState())).toBe('Пользователь с таким email уже существует');
      expect(selectIsAuth(store.getState())).toBe(false);
    });

    it('should save token, userId and registeredUsers to localStorage', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      } as Response);

      await store.dispatch(
        registerThunk({
          name: 'Storage Test',
          email: 'storage@test.com',
          gender: 'male',
        }),
      );

      expect(localStorage.getItem('token')).toBe('token123');
      expect(localStorage.getItem('userId')).toContain('user-registered-');
      const registered = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      expect(registered).toHaveLength(1);
      expect(registered[0].email).toBe('storage@test.com');
    });
  });

  // ─── checkAuthThunk ─────────────────────────────────────────

  describe('checkAuthThunk', () => {
    it('should restore user from localStorage', async () => {
      localStorage.setItem('token', 'token123');
      localStorage.setItem('userId', 'user-mock-1');

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      await store.dispatch(checkAuthThunk());

      expect(selectAuthUser(store.getState())?.id).toBe('user-mock-1');
      expect(selectIsAuth(store.getState())).toBe(true);
    });

    it('should reset auth if userId not found', async () => {
      localStorage.setItem('token', 'token123');
      localStorage.setItem('userId', 'non-existent');

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      await store.dispatch(checkAuthThunk());

      expect(selectAuthUser(store.getState())).toBeNull();
      expect(selectIsAuth(store.getState())).toBe(false);
      expect(selectAuthToken(store.getState())).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  // ─── logout ─────────────────────────────────────────────────

  describe('logout', () => {
    it('should clear token and userId', async () => {
      // Сначала логиним
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      await store.dispatch(loginThunk('mock@test.com'));
      expect(selectIsAuth(store.getState())).toBe(true);

      // Логаут
      store.dispatch(logout());

      expect(selectAuthUser(store.getState())).toBeNull();
      expect(selectAuthToken(store.getState())).toBeNull();
      expect(selectIsAuth(store.getState())).toBe(false);
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('userId')).toBeNull();
    });

    it('should not remove registeredUsers', async () => {
      localStorage.setItem('registeredUsers', JSON.stringify([{ id: '1', name: 'Test' }]));

      store.dispatch(logout());

      expect(localStorage.getItem('registeredUsers')).not.toBeNull();
    });
  });

  // ─── reducer actions ───────────────────────────────────────

  describe('reducer actions', () => {
    it('clearAuthError should reset error', () => {
      store.dispatch(clearAuthError());
      expect(selectAuthError(store.getState())).toBeNull();
    });

    it('setAuthUser should set user', () => {
      const user: User = {
        id: '1',
        name: 'Test',
        email: 'test@test.com',
        avatarUrl: null,
        createdAt: '2024-01-01',
      };

      store.dispatch(setAuthUser(user));
      expect(selectAuthUser(store.getState())?.name).toBe('Test');
    });

    it('updateAuthUser should update user fields', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      await store.dispatch(loginThunk('mock@test.com'));

      store.dispatch(updateAuthUser({ name: 'Updated Name', city: 'Kazan' }));

      const user = selectAuthUser(store.getState());
      expect(user?.name).toBe('Updated Name');
      expect(user?.city).toBe('Kazan');
    });

    it('updateAuthUser should not crash if no user', () => {
      expect(() => {
        store.dispatch(updateAuthUser({ name: 'Test' }));
      }).not.toThrow();
      expect(selectAuthUser(store.getState())).toBeNull();
    });
  });

  // ─── selectors ─────────────────────────────────────────────

  describe('selectors', () => {
    it('selectAuthUserId should return user id', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      await store.dispatch(loginThunk('mock@test.com'));

      expect(selectAuthUserId(store.getState())).toBe('user-mock-1');
    });

    it('selectAuthUserId should return null if no user', () => {
      expect(selectAuthUserId(store.getState())).toBeNull();
    });

    it('selectAuthLoading should return loading state', () => {
      expect(selectAuthLoading(store.getState())).toBe(false);
    });
  });
});
