import usersReducer from '@/entities/user/model/usersSlice';
import filtrationReducer from '@/features/filtration/models/filtrationSlice';
import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from '@/features/favorite/model/favoriteSlice';
// Импортируй свои slice'ы здесь по мере их создания:
// import skillsReducer from '@/entities/skill/model/skillsSlice'
// import authReducer from '@/features/auth/model/authSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    favorite: favoriteReducer,
    // skills: skillsReducer,
    // auth: authReducer,
    filtration: filtrationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
