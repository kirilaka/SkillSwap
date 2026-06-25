import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/shared/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

export const loginThunk = createAsyncThunk<User, string, { rejectValue: string }>(
  'auth/login',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch('/db/users.json');
      const users: User[] = await response.json();
      const userEmail = users.find((u) => u.email === email);

      if (!userEmail) {
        return rejectWithValue('Пользователь не найден');
      }

      const token = 'token123';
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userEmail.id);

      return userEmail;
    } catch {
      return rejectWithValue('Ошибка загрузки пользователя');
    }
  },
);

export const checkAuthThunk = createAsyncThunk<User | null, void, { rejectValue: string }>(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        return rejectWithValue('Нет данных для авторизации');
      }

      const response = await fetch('/db/users.json');
      const users: User[] = await response.json();
      const user = users.find((u) => u.id === userId);

      if (!user) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        return rejectWithValue('Пользователь не найден');
      }
      return user;
    } catch {
      return rejectWithValue('Ошибка авторизации');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // loginThunk
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.token = localStorage.getItem('token');
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });

    // checkAuthThunk
    builder
      .addCase(checkAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action: PayloadAction<User | null>) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuth = true;
        }
        state.isLoading = false;
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuth = false;
        state.isLoading = false;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuth = (state: { auth: AuthState }) => state.auth.isAuth;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
