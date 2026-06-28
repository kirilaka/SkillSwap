import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

const STORAGE_KEY = 'favoriteUserIds';

interface FavoritesState {
  favoriteUserIds: string[];
  error: string | null;
}

const loadFavoritesFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

const saveFavoritesToStorage = (ids: string[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    throw new Error('Не удалось сохранить избранное');
  }
};

const initialState: FavoritesState = {
  favoriteUserIds: loadFavoritesFromStorage(),
  error: null,
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (!state.favoriteUserIds.includes(userId)) {
        state.favoriteUserIds.push(userId);
        try {
          saveFavoritesToStorage(state.favoriteUserIds);
          state.error = null;
        } catch {
          state.error = 'Ошибка сохранения избранного';
        }
      }
    },
    removeFavoriteUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.favoriteUserIds = state.favoriteUserIds.filter((id) => id !== userId);
      try {
        saveFavoritesToStorage(state.favoriteUserIds);
        state.error = null;
      } catch {
        state.error = 'Ошибка сохранения избранного';
      }
    },
    toggleFavoriteUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const index = state.favoriteUserIds.indexOf(userId);
      if (index >= 0) {
        state.favoriteUserIds.splice(index, 1);
      } else {
        state.favoriteUserIds.push(userId);
      }
      try {
        saveFavoritesToStorage(state.favoriteUserIds);
        state.error = null;
      } catch {
        state.error = 'Ошибка сохранения избранного';
      }
    },
    clearFavorites: (state) => {
      state.favoriteUserIds = [];
      try {
        saveFavoritesToStorage(state.favoriteUserIds);
        state.error = null;
      } catch {
        state.error = 'Ошибка сохранения избранного';
      }
    },
    clearFavoritesError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addFavoriteUser,
  removeFavoriteUser,
  toggleFavoriteUser,
  clearFavorites,
  clearFavoritesError,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;

export const selectFavoriteUserIds = (state: { favorites: FavoritesState }) =>
  state.favorites.favoriteUserIds;

export const selectFavoritesError = (state: { favorites: FavoritesState }) => state.favorites.error;

export const selectIsFavoriteUser = createSelector(
  [selectFavoriteUserIds, (_, userId: string) => userId],
  (favoriteIds, userId) => favoriteIds.includes(userId),
);
