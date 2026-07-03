// unit tests for favoriteSlice.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import favoriteReducer, {
  addFavoriteUser,
  removeFavoriteUser,
  toggleFavoriteUser,
  clearFavorites,
  clearFavoritesError,
  selectFavoriteUserIds,
  selectFavoritesError,
  selectIsFavoriteUser,
} from './favoriteSlice';

const STORAGE_KEY = 'favoriteUserIds';

const rootReducer = combineReducers({
  favorites: favoriteReducer,
});

type RootState = ReturnType<typeof rootReducer>;

const createTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

type TestStore = ReturnType<typeof createTestStore>;

describe('favoriteSlice', () => {
  let store: TestStore;

  beforeEach(() => {
    localStorage.clear();
    store = createTestStore();
  });

  describe('initial state', () => {
    it('should have empty array when localStorage is empty', () => {
      expect(selectFavoriteUserIds(store.getState())).toEqual([]);
      expect(selectFavoritesError(store.getState())).toBeNull();
    });

    it('should load from preloaded state', () => {
      store = createTestStore({
        favorites: { favoriteUserIds: ['user-1', 'user-2'], error: null },
      });

      expect(selectFavoriteUserIds(store.getState())).toEqual(['user-1', 'user-2']);
    });
  });

  describe('addFavoriteUser', () => {
    it('should add user to favorites', () => {
      store.dispatch(addFavoriteUser('user-1'));

      expect(selectFavoriteUserIds(store.getState())).toEqual(['user-1']);
      expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(['user-1']));
    });

    it('should not create duplicate', () => {
      store.dispatch(addFavoriteUser('user-1'));
      store.dispatch(addFavoriteUser('user-1'));

      expect(selectFavoriteUserIds(store.getState())).toEqual(['user-1']);
    });

    it('should add multiple users', () => {
      store.dispatch(addFavoriteUser('user-1'));
      store.dispatch(addFavoriteUser('user-2'));

      expect(selectFavoriteUserIds(store.getState())).toEqual(['user-1', 'user-2']);
    });
  });

  describe('removeFavoriteUser', () => {
    it('should remove user from favorites', () => {
      store = createTestStore({
        favorites: { favoriteUserIds: ['user-1', 'user-2'], error: null },
      });

      store.dispatch(removeFavoriteUser('user-1'));

      expect(selectFavoriteUserIds(store.getState())).toEqual(['user-2']);
      expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(['user-2']));
    });

    it('should handle removing non-existent user', () => {
      store = createTestStore({
        favorites: { favoriteUserIds: ['user-1'], error: null },
      });

      store.dispatch(removeFavoriteUser('user-999'));

      expect(selectFavoriteUserIds(store.getState())).toEqual(['user-1']);
    });
  });

  describe('toggleFavoriteUser', () => {
    it('should add user when not in favorites', () => {
      store.dispatch(toggleFavoriteUser('user-1'));

      expect(selectFavoriteUserIds(store.getState())).toEqual(['user-1']);
    });

    it('should remove user when in favorites', () => {
      store = createTestStore({
        favorites: { favoriteUserIds: ['user-1', 'user-2'], error: null },
      });

      store.dispatch(toggleFavoriteUser('user-1'));

      expect(selectFavoriteUserIds(store.getState())).toEqual(['user-2']);
    });
  });

  describe('clearFavorites', () => {
    it('should clear all favorites', () => {
      store = createTestStore({
        favorites: { favoriteUserIds: ['user-1', 'user-2'], error: null },
      });

      store.dispatch(clearFavorites());

      expect(selectFavoriteUserIds(store.getState())).toEqual([]);
      expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify([]));
    });
  });

  describe('clearFavoritesError', () => {
    it('should clear error', () => {
      store = createTestStore({
        favorites: { favoriteUserIds: [], error: 'Some error' },
      });

      store.dispatch(clearFavoritesError());

      expect(selectFavoritesError(store.getState())).toBeNull();
    });
  });

  describe('selectors', () => {
    beforeEach(() => {
      store = createTestStore({
        favorites: { favoriteUserIds: ['user-1', 'user-2'], error: null },
      });
    });

    it('selectFavoriteUserIds should return all ids', () => {
      expect(selectFavoriteUserIds(store.getState())).toEqual(['user-1', 'user-2']);
    });

    it('selectFavoritesError should return error', () => {
      store = createTestStore({
        favorites: { favoriteUserIds: [], error: 'Test error' },
      });
      expect(selectFavoritesError(store.getState())).toBe('Test error');
    });

    it('selectIsFavoriteUser should return true for favorite user', () => {
      expect(selectIsFavoriteUser(store.getState(), 'user-1')).toBe(true);
    });

    it('selectIsFavoriteUser should return false for non-favorite user', () => {
      expect(selectIsFavoriteUser(store.getState(), 'user-999')).toBe(false);
    });
  });
});
