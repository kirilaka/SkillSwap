import usersReducer from '@/entities/user/model/usersSlice';
import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from '@/features/favorite/model/favoriteSlice';
import skillsReducer from '@/entities/skill/model/skillsSlice';
import authReducer from '@/features/auth/model/authSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    favorite: favoriteReducer,
    skills: skillsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
