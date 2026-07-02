import usersReducer from '@/entities/user/model/usersSlice';
import filtrationReducer from '@/features/filtration/models/filtrationSlice';
import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from '@/features/favorite/model/favoriteSlice';
import skillsReducer from '@/entities/skill/model/skillsSlice';
import authReducer from '@/features/auth/model/authSlice';
import requestsReducer from '@/features/requests/model/requestsSlice';
export const store = configureStore({
  reducer: {
    users: usersReducer,
    favorite: favoriteReducer,
    filtration: filtrationReducer,
    skills: skillsReducer,
    auth: authReducer,
    requests: requestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
