import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  clearAuthData,
  findRegisteredUserByEmail,
  findUserByEmail,
  findUserById,
  getRegisteredUsers,
  saveRegisteredUsers,
  setAuthData,
  TOKEN_KEY,
  USER_ID_KEY,
} from './authApi';
import { UserInfo } from '@/shared/types';

interface AuthState {
  // Текуший авторизованный пользователь
  user: UserInfo | null;
  // mock-токен авторизации
  token: string | null;
  // авторизован пользователь или нет
  isAuth: boolean;
  // состояние загрузки / проверки авторизации
  isLoading: boolean;
  // текст ошибки
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  isAuth: !!localStorage.getItem(TOKEN_KEY),
  isLoading: false,
  error: null,
};

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  city?: string;
  age?: number;
  gender: 'male' | 'female';
  avatarUrl: string | null;
}
interface RegisterResult {
  user: UserInfo;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk<UserInfo, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = findRegisteredUserByEmail(email);

      if (!user) {
        return rejectWithValue('Пользователь не найден');
      }

      if (user.password !== password) {
        return rejectWithValue('Неверный пароль');
      }

      const token = 'token123';
      setAuthData(token, user.id);

      const userWithoutPassword = { ...user, password: '' };

      return userWithoutPassword;
    } catch {
      return rejectWithValue('Ошибка авторизации');
    }
  },
);

export const registerThunk = createAsyncThunk<
  RegisterResult,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const existingUser = await findUserByEmail(payload.email);
    if (existingUser) {
      return rejectWithValue('Пользователь с таким email уже существует');
    }
    const newUser: UserInfo = {
      id: `user-registered-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      avatarUrl: payload.avatarUrl,
      createdAt: new Date().toISOString(),
      city: payload.city,
      age: payload.age,
      gender: payload.gender,
      description: '',
    };

    const newRegisteredUser = {
      ...newUser,
      password: payload.password,
    };

    // Сохраняем в registeredUsers
    const registeredUsers = getRegisteredUsers();
    registeredUsers.push(newRegisteredUser);
    saveRegisteredUsers(registeredUsers);

    // Авторизуем
    const token = 'token123';
    setAuthData(token, newRegisteredUser.id);

    return { user: newRegisteredUser, token };
  } catch {
    return rejectWithValue('Ошибка регистрации');
  }
});

export const checkAuthThunk = createAsyncThunk<UserInfo | null, void, { rejectValue: string }>(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const userId = localStorage.getItem(USER_ID_KEY);

      if (!token || !userId) {
        return rejectWithValue('Нет данных для авторизации');
      }
      const user = await findUserById(userId);

      if (!user) {
        clearAuthData();
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
      clearAuthData();
    },
    clearAuthError(state) {
      state.error = null;
    },
    setAuthUser(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
    },
    updateAuthUser(state, action: PayloadAction<Partial<UserInfo>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // loginThunk
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.user = action.payload;
        state.token = localStorage.getItem(TOKEN_KEY);
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });

    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action: PayloadAction<RegisterResult>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка регистрации';
      });

    // checkAuthThunk
    builder
      .addCase(checkAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action: PayloadAction<UserInfo | null>) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuth = true;
        }
        state.isLoading = false;
      })
      .addCase(checkAuthThunk.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isAuth = false;
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка проверки авторизации';
      });
  },
});

export const { logout, clearAuthError, setAuthUser, updateAuthUser } = authSlice.actions;

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuth = (state: { auth: AuthState }) => state.auth.isAuth;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectAuthUserId = (state: { auth: AuthState }) => state.auth.user?.id ?? null;

export default authSlice.reducer;
