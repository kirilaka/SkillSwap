import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from './types';
import { fetchUserById, fetchUsers } from '@/api/users';
import { RootState } from '@/store';

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
  items: User[];
  /** выбранный пользователь, если нужен для профиля или страницы пользователя */
  /** сделал undefined вместо null потомучто функция fetchUserById возвращает User | undefined */
  currentUser: User | undefined;
  /** состояние загрузки */
  isLoading: boolean;
  /** текст ошибки при неудачной загрузке */
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  currentUser: undefined,
  isLoading: false,
  error: null,
};

/** получить пользователя по id из списка items */
export const selectUserById = (state: RootState, id: string) =>
  state.users.items.find((user) => user.id === id);

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
      state.currentUser = undefined;
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
        state.currentUser = action.payload;
      })
      .addCase(fetchUserByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователя';
      });
  },
});

export default usersSlice.reducer;

export const { clearUsersError, clearCurrentUser } = usersSlice.actions;

export const { selectUsers, selectCurrentUser, selectUsersLoading, selectUsersError } =
  usersSlice.selectors;
