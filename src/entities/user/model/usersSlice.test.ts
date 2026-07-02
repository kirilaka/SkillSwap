// unit test
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer, {
  fetchUsersThunk,
  fetchUserByIdThunk,
  clearUsersError,
  clearCurrentUser,
  selectUsers,
  selectCurrentUser,
  selectUsersLoading,
  selectUsersError,
  selectUserById,
} from './usersSlice';
import * as usersApi from '@/api/users';
import type { UserInfo } from '@/shared/types';

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

const createTestStore = () =>
  configureStore({
    reducer: { users: usersReducer },
  });

type TestStore = ReturnType<typeof createTestStore>;

describe('usersSlice', () => {
  let store: TestStore;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState();
      expect(state.users.items).toEqual([]);
      expect(state.users.currentUser).toBeNull();
      expect(state.users.isLoading).toBe(false);
      expect(state.users.error).toBeNull();
    });
  });

  describe('fetchUsersThunk', () => {
    it('pending should set isLoading to true', async () => {
      vi.mocked(usersApi.fetchUsers).mockResolvedValue([mockUser]);

      const promise = store.dispatch(fetchUsersThunk());
      expect(selectUsersLoading(store.getState())).toBe(true);

      await promise;
      expect(selectUsersLoading(store.getState())).toBe(false);
    });

    it('fulfilled should set items', async () => {
      vi.mocked(usersApi.fetchUsers).mockResolvedValue([mockUser, mockUser2]);

      await store.dispatch(fetchUsersThunk());

      const users = selectUsers(store.getState());
      expect(users).toHaveLength(2);
      expect(users[0].id).toBe('user-1');
      expect(users[1].id).toBe('user-2');
    });

    it('rejected should set error', async () => {
      vi.mocked(usersApi.fetchUsers).mockRejectedValue(new Error('Network error'));

      await store.dispatch(fetchUsersThunk());

      expect(selectUsersError(store.getState())).toBe('Network error');
      expect(selectUsersLoading(store.getState())).toBe(false);
      expect(selectUsers(store.getState())).toEqual([]);
    });
  });

  describe('fetchUserByIdThunk', () => {
    it('fulfilled should set currentUser', async () => {
      vi.mocked(usersApi.fetchUserById).mockResolvedValue(mockUser);

      await store.dispatch(fetchUserByIdThunk('user-1'));

      expect(selectCurrentUser(store.getState())).toEqual(mockUser);
      expect(selectUsersLoading(store.getState())).toBe(false);
    });

    it('fulfilled should set null if user not found', async () => {
      vi.mocked(usersApi.fetchUserById).mockResolvedValue(undefined as unknown as UserInfo);

      await store.dispatch(fetchUserByIdThunk('non-existent'));

      expect(selectCurrentUser(store.getState())).toBeNull();
      expect(selectUsersLoading(store.getState())).toBe(false);
    });

    it('rejected should set error', async () => {
      vi.mocked(usersApi.fetchUserById).mockRejectedValue(new Error('Not found'));

      await store.dispatch(fetchUserByIdThunk('user-1'));

      expect(selectUsersError(store.getState())).toBe('Not found');
      expect(selectUsersLoading(store.getState())).toBe(false);
    });
  });

  describe('reducer actions', () => {
    it('clearUsersError should reset error', async () => {
      vi.mocked(usersApi.fetchUsers).mockRejectedValue(new Error('Fail'));
      await store.dispatch(fetchUsersThunk());

      expect(selectUsersError(store.getState())).toBe('Fail');

      store.dispatch(clearUsersError());

      expect(selectUsersError(store.getState())).toBeNull();
    });

    it('clearCurrentUser should reset currentUser', async () => {
      vi.mocked(usersApi.fetchUserById).mockResolvedValue(mockUser);
      await store.dispatch(fetchUserByIdThunk('user-1'));

      expect(selectCurrentUser(store.getState())).toEqual(mockUser);

      store.dispatch(clearCurrentUser());

      expect(selectCurrentUser(store.getState())).toBeNull();
    });
  });

  describe('selectors', () => {
    it('selectUserById should find user by id', async () => {
      vi.mocked(usersApi.fetchUsers).mockResolvedValue([mockUser, mockUser2]);
      await store.dispatch(fetchUsersThunk());

      const user = selectUserById(store.getState())('user-1');
      expect(user).toEqual(mockUser);

      const notFound = selectUserById(store.getState())('unknown');
      expect(notFound).toBeUndefined();
    });

    it('selectUsersLoading should return loading state', () => {
      expect(selectUsersLoading(store.getState())).toBe(false);
    });

    it('selectUsersError should return error state', () => {
      expect(selectUsersError(store.getState())).toBeNull();
    });
  });
});
