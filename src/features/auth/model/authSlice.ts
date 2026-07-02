import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo as User } from '@/shared/types';

//Ключи для localStorage

const TOKEN_KEY = 'token';
const USER_ID_KEY = 'userId';
const REGISTERED_USERS_KEY = 'registeredUsers';

interface AuthState {
  // Текуший авторизованный пользователь
  user: User | null;
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

const getRegisteredUsers = (): User[] => {
  const raw = localStorage.getItem(REGISTERED_USERS_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveRegisteredUsers = (users: User[]) => {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

const setAuthData = (token: string, userId: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ID_KEY, userId);
};

const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
};

export interface RegisterPayload {
  name: string;
  email: string;
  city?: string;
  age?: number;
  gender: 'male' | 'female';
}
interface RegisterResult {
  user: User;
  token: string;
}

// Поиск пользователя во всех источниках
const findUserByEmail = async (email: string): Promise<User | undefined> => {
  // Ищем в users.json
  const response = await fetch('/db/users.json');
  const mockUsers: User[] = await response.json();
  const mockUser = mockUsers.find((u) => u.email === email);
  if (mockUser) {
    return mockUser;
  }

  // Ищем в зарегестрированных
  const registeredUsers = getRegisteredUsers();
  return registeredUsers.find((u) => u.email === email);
};

const findUserById = async (userId: string): Promise<User | undefined> => {
  // ищем в user.json
  const response = await fetch('/db/users.json');
  const mockUsers: User[] = await response.json();
  const mockUser = mockUsers.find((u) => u.id === userId);
  if (mockUser) {
    return mockUser;
  }

  // ищем в зарегестрированных
  const registeredUsers = getRegisteredUsers();
  return registeredUsers.find((u) => u.id === userId);
};

export const loginThunk = createAsyncThunk<User, string, { rejectValue: string }>(
  'auth/login',
  async (email, { rejectWithValue }) => {
    try {
      const userEmail = await findUserByEmail(email);

      if (!userEmail) {
        return rejectWithValue('Пользователь не найден');
      }

      const token = 'token123';
      setAuthData(token, userEmail.id);

      return userEmail;
    } catch {
      return rejectWithValue('Ошибка загрузки пользователя');
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
    const newUser: User = {
      id: `user-registered-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      city: payload.city,
      age: payload.age,
      gender: payload.gender,
      description: '',
    };

    // Сохраняем в registeredUsers
    const registeredUsers = getRegisteredUsers();
    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    // Авторизуем
    const token = 'token123';
    setAuthData(token, newUser.id);

    return { user: newUser, token };
  } catch {
    return rejectWithValue('Ошибка регистрации');
  }
});

export const checkAuthThunk = createAsyncThunk<User | null, void, { rejectValue: string }>(
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
    setAuthUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    updateAuthUser(state, action: PayloadAction<Partial<User>>) {
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
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
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
      .addCase(checkAuthThunk.fulfilled, (state, action: PayloadAction<User | null>) => {
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
