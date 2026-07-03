import { describe, it, expect, vi, beforeEach } from 'vitest';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
import usersReducer from '@/entities/user/model/usersSlice';
import skillsReducer from '@/entities/skill/model/skillsSlice';
import favoriteReducer from '@/features/favorite/model/favoriteSlice';
import filtrationReducer from '@/features/filtration/models/filtrationSlice';
import requestsReducer from '@/features/requests/model/requestsSlice';
import type { User, UserInfo } from '@/shared/types';

const rootReducer = combineReducers({
  filtration: filtrationReducer,
  users: usersReducer,
  skills: skillsReducer,
  favorite: favoriteReducer,
  auth: authReducer,
  requests: requestsReducer,
});

type TestState = ReturnType<typeof rootReducer>;

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

const createTestStore = (preloadedState?: Partial<TestState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

type TestStore = ReturnType<typeof createTestStore>;

const mockRegisteredUser = {
  ...mockUsers[0],
  password: 'password123',
};

const seedRegisteredUsers = (users = [mockRegisteredUser]) => {
  localStorage.setItem('registeredUsers', JSON.stringify(users));
};

describe('authSlice', () => {
  let store: TestStore;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(mockUsers),
    } as Response);

    store = createTestStore({
      users: { items: mockUsers, currentUser: null, isLoading: false, error: null },
      skills: { items: [], currentSkill: null, isLoading: false, error: null },
      favorite: { favoriteUserIds: [], error: null },
      auth: { user: null, token: null, isAuth: false, isLoading: false, error: null },
      filtration: {
        selectedCategoryIds: [],
        selectedSubcategoryIds: [],
        exchangeType: 'all',
        gender: 'any',
        city: '',
        searchValue: '',
      },
      requests: { items: [], isLoading: false, error: null },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      expect(selectAuthUser(store.getState())).toBeNull();
      expect(selectAuthToken(store.getState())).toBeNull();
      expect(selectIsAuth(store.getState())).toBe(false);
      expect(selectAuthLoading(store.getState())).toBe(false);
      expect(selectAuthError(store.getState())).toBeNull();
    });
  });

  describe('loginThunk', () => {
    it('should login registered user successfully', async () => {
      seedRegisteredUsers();

      await store
        .dispatch(loginThunk({ email: 'mock@test.com', password: 'password123' }))
        .unwrap();

      expect(selectAuthUser(store.getState())?.email).toBe('mock@test.com');
      expect(selectIsAuth(store.getState())).toBe(true);
      expect(selectAuthToken(store.getState())).toBe('token123');
      expect(localStorage.getItem('token')).toBe('token123');
      expect(localStorage.getItem('userId')).toBe('user-mock-1');
    });

    it('should reject if email not found in registered users', async () => {
      await store.dispatch(loginThunk({ email: 'nonexistent@test.com', password: 'password123' }));

      expect(selectAuthError(store.getState())).toBe('Пользователь не найден');
      expect(selectIsAuth(store.getState())).toBe(false);
    });

    it('should reject if password is wrong', async () => {
      seedRegisteredUsers();

      await store.dispatch(loginThunk({ email: 'mock@test.com', password: 'wrong' }));

      expect(selectAuthError(store.getState())).toBe('Неверный пароль');
      expect(selectIsAuth(store.getState())).toBe(false);
    });
  });

  describe('registerThunk', () => {
    it('should create new user', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      } as Response);

      await store
        .dispatch(
          registerThunk({
            name: 'New User',
            email: 'new@test.com',
            gender: 'female',
            city: 'SPb',
            age: 30,
            password: '32323323',
            avatarUrl: null,
          }),
        )
        .unwrap();

      const user = selectAuthUser(store.getState());
      expect(user?.email).toBe('new@test.com');
      expect(user?.name).toBe('New User');
      expect(selectIsAuth(store.getState())).toBe(true);
      expect(selectAuthToken(store.getState())).toBe('token123');
    });

    it('should reject duplicate email from mock users', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      await store.dispatch(
        registerThunk({
          name: 'Duplicate',
          email: 'mock@test.com',
          gender: 'male',
          password: '32323323',
          avatarUrl: null,
        }),
      );

      expect(selectAuthError(store.getState())).toBe('Пользователь с таким email уже существует');
      expect(selectIsAuth(store.getState())).toBe(false);
    });

    it('should save token, userId and new registered user to localStorage', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      } as Response);

      await store
        .dispatch(
          registerThunk({
            name: 'Storage Test',
            email: 'storage@test.com',
            gender: 'male',
            password: '32323323',
            avatarUrl: null,
          }),
        )
        .unwrap();

      expect(localStorage.getItem('token')).toBe('token123');
      expect(localStorage.getItem('userId')).toContain('user-registered-');
      const registered = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      expect(registered).toHaveLength(1);
      expect(registered[0].email).toBe('storage@test.com');
      expect(registered[0].password).toBe('32323323');
    });
  });

  describe('checkAuthThunk', () => {
    it('should restore mock user from localStorage', async () => {
      localStorage.setItem('token', 'token123');
      localStorage.setItem('userId', 'user-mock-1');
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers),
      } as Response);

      await store.dispatch(checkAuthThunk()).unwrap();

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

  describe('logout', () => {
    it('should clear token and userId', async () => {
      seedRegisteredUsers();

      await store
        .dispatch(loginThunk({ email: 'mock@test.com', password: 'password123' }))
        .unwrap();
      expect(selectIsAuth(store.getState())).toBe(true);

      store.dispatch(logout());

      expect(selectAuthUser(store.getState())).toBeNull();
      expect(selectAuthToken(store.getState())).toBeNull();
      expect(selectIsAuth(store.getState())).toBe(false);
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('userId')).toBeNull();
    });

    it('should not remove registeredUsers', () => {
      localStorage.setItem('registeredUsers', JSON.stringify([{ id: '1', name: 'Test' }]));

      store.dispatch(logout());

      expect(localStorage.getItem('registeredUsers')).not.toBeNull();
    });
  });

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

    it('updateAuthUser should update user fields', () => {
      store.dispatch(setAuthUser(mockUsers[0]));
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

  describe('selectors', () => {
    it('selectAuthUserId should return user id', () => {
      store.dispatch(setAuthUser(mockUsers[0]));

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
