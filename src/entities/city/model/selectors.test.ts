import { describe, it, expect } from 'vitest';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import usersReducer from '@/entities/user/model/usersSlice';
import { selectAvailableFilterCities } from './selectors';
import type { UserInfo } from '@/shared/types';

const rootReducer = combineReducers({
  users: usersReducer,
});

type RootState = ReturnType<typeof rootReducer>;

const createTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

type TestStore = ReturnType<typeof createTestStore>;

// Хелпер для каста state к типу, который ожидает селектор
const getState = (store: TestStore) =>
  store.getState() as Parameters<typeof selectAvailableFilterCities>[0];

describe('selectAvailableFilterCities', () => {
  let store: TestStore;

  it('should return only cities that exist in users', () => {
    store = createTestStore({
      users: {
        items: [
          { id: 'user-1', name: 'User One', city: 'Москва' } as UserInfo,
          { id: 'user-2', name: 'User Two', city: 'Санкт-Петербург' } as UserInfo,
        ],
        currentUser: null,
        isLoading: false,
        error: null,
      },
    });

    const result = selectAvailableFilterCities(getState(store));

    expect(result).toHaveLength(2);
    expect(result.map((c) => c.name)).toEqual(['Москва', 'Санкт-Петербург']);
    expect(result.map((c) => c.id)).toEqual(['moscow', 'saint-petersburg']);
  });

  it('should not return cities without users', () => {
    store = createTestStore({
      users: {
        items: [{ id: 'user-1', name: 'User One', city: 'Москва' } as UserInfo],
        currentUser: null,
        isLoading: false,
        error: null,
      },
    });

    const result = selectAvailableFilterCities(getState(store));

    expect(result.map((c) => c.name)).not.toContain('Казань');
    expect(result.map((c) => c.name)).not.toContain('Новосибирск');
    expect(result.map((c) => c.name)).not.toContain('Владивосток');
  });

  it('should not return duplicates', () => {
    store = createTestStore({
      users: {
        items: [
          { id: 'user-1', name: 'User One', city: 'Москва' } as UserInfo,
          { id: 'user-2', name: 'User Two', city: 'Москва' } as UserInfo,
          { id: 'user-3', name: 'User Three', city: 'Москва' } as UserInfo,
        ],
        currentUser: null,
        isLoading: false,
        error: null,
      },
    });

    const result = selectAvailableFilterCities(getState(store));

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Москва');
    expect(result[0].id).toBe('moscow');
  });

  it('should return City objects with correct shape', () => {
    store = createTestStore({
      users: {
        items: [{ id: 'user-1', name: 'User One', city: 'Москва' } as UserInfo],
        currentUser: null,
        isLoading: false,
        error: null,
      },
    });

    const result = selectAvailableFilterCities(getState(store));

    expect(result[0]).toEqual({ id: 'moscow', name: 'Москва' });
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(typeof result[0].id).toBe('string');
    expect(typeof result[0].name).toBe('string');
  });

  it('should work with empty users list', () => {
    store = createTestStore({
      users: {
        items: [],
        currentUser: null,
        isLoading: false,
        error: null,
      },
    });

    const result = selectAvailableFilterCities(getState(store));

    expect(result).toEqual([]);
  });

  it('should not crash when user.city is undefined', () => {
    store = createTestStore({
      users: {
        items: [
          { id: 'user-1', name: 'User One', city: undefined } as unknown as UserInfo,
          { id: 'user-2', name: 'User Two', city: 'Москва' } as UserInfo,
        ],
        currentUser: null,
        isLoading: false,
        error: null,
      },
    });

    const result = selectAvailableFilterCities(getState(store));

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Москва');
  });

  it('should handle multiple different cities', () => {
    store = createTestStore({
      users: {
        items: [
          { id: 'user-1', name: 'User One', city: 'Москва' } as UserInfo,
          { id: 'user-2', name: 'User Two', city: 'Казань' } as UserInfo,
          { id: 'user-3', name: 'User Three', city: 'Новосибирск' } as UserInfo,
          { id: 'user-4', name: 'User Four', city: 'Москва' } as UserInfo,
        ],
        currentUser: null,
        isLoading: false,
        error: null,
      },
    });

    const result = selectAvailableFilterCities(getState(store));

    expect(result).toHaveLength(3);
    expect(result.map((c) => c.name)).toContain('Москва');
    expect(result.map((c) => c.name)).toContain('Казань');
    expect(result.map((c) => c.name)).toContain('Новосибирск');
  });
});
