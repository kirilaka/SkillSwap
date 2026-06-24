import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

const STORAGE_KEY = 'favoriteUserIds';

interface FavoritesState {
  favoriteUserIds: string[];
  isLoading: boolean;
  error: string | null;
}

const loadFavoritesFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavoritesToStorage = (ids: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
};

const initialState: FavoritesState = {
  favoriteUserIds: loadFavoritesFromStorage(),
  isLoading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    initFavorites: (state) => {
      state.favoriteUserIds = loadFavoritesFromStorage();
      state.isLoading = false;
      state.error = null;
    },
    addFavoriteUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (!state.favoriteUserIds.includes(userId)) {
        state.favoriteUserIds.push(userId);
        saveFavoritesToStorage(state.favoriteUserIds);
      }
    },
    removeFavoriteUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.favoriteUserIds = state.favoriteUserIds.filter((id) => id !== userId);
      saveFavoritesToStorage(state.favoriteUserIds);
    },
    toggleFavoriteUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const index = state.favoriteUserIds.indexOf(userId);
      if (index >= 0) {
        state.favoriteUserIds.splice(index, 1);
      } else {
        state.favoriteUserIds.push(userId);
      }
      saveFavoritesToStorage(state.favoriteUserIds);
    },
    clearFavorites: (state) => {
      state.favoriteUserIds = [];
      saveFavoritesToStorage(state.favoriteUserIds);
      state.error = null;
    },
    clearFavoritesError: (state) => {
      state.error = null;
    },
  },
});

export const {
  initFavorites,
  addFavoriteUser,
  removeFavoriteUser,
  toggleFavoriteUser,
  clearFavorites,
  clearFavoritesError,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;

// ===== Selectors =====
export const selectFavoritesState = (state: RootState) => state.favorites;

export const selectFavoriteUserIds = (state: RootState) => state.favorites.favoriteUserIds;

export const selectFavoritesLoading = (state: RootState) => state.favorites.isLoading;

export const selectFavoritesError = (state: RootState) => state.favorites.error;

export const selectIsFavoriteUser = (state: RootState, userId: string) =>
  state.favorites.favoriteUserIds.includes(userId);
