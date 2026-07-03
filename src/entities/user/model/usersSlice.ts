import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserById, fetchUsers } from '@/api/users';
import { UserInfo } from '@/shared/types';

export const fetchUsersThunk = createAsyncThunk('users/fetchAll', async () => {
  const data = await fetchUsers();
  return data;
});

export const fetchUserByIdThunk = createAsyncThunk('users/fetchById', async (id: string) => {
  const data = await fetchUserById(id);
  return data;
});

type UsersState = {
  /** список всех пользователей */
  items: UserInfo[];
  /** выбранный пользователь, если нужен для профиля или страницы пользователя */
  currentUser: UserInfo | null;
  /** состояние загрузки */
  isLoading: boolean;
  /** текст ошибки при неудачной загрузке */
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  currentUser: null,
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /** очистка ошибки */
    clearUsersError: (state) => {
      state.error = null;
    },
    /** очистка выбранного пользователя */
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    addUser: (state, action: PayloadAction<UserInfo>) => {
      const exists = state.items.some((user) => user.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
      }
    },
  },
  selectors: {
    /** получить список всех пользователей */
    selectUsers: (state) => state.items,
    /** получить выбранного пользователя */
    selectCurrentUser: (state) => state.currentUser,
    /** получить состояние загрузки */
    selectUsersLoading: (state) => state.isLoading,
    /** получить ошибку */
    selectUsersError: (state) => state.error,
    /** получить пользователя по id из списка items */
    selectUserById: (state) => (id: string) => state.items.find((user) => user.id === id),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователей';
      })

      .addCase(fetchUserByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload ?? null;
      })
      .addCase(fetchUserByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователя';
      });
  },
});

export default usersSlice.reducer;

export const { clearUsersError, clearCurrentUser, addUser } = usersSlice.actions;

export const {
  selectUsers,
  selectCurrentUser,
  selectUsersLoading,
  selectUsersError,
  selectUserById,
} = usersSlice.selectors;
