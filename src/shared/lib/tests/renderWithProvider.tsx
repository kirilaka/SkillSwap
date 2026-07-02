// src/shared/lib/tests/renderWithProviders.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import type { RootState } from '@/store';

import usersReducer from '@/entities/user/model/usersSlice';
import skillsReducer from '@/entities/skill/model/skillsSlice';
import authReducer from '@/features/auth/model/authSlice';
import favoriteReducer from '@/features/favorite/model/favoriteSlice';
import filtrationReducer from '@/features/filtration/models/filtrationSlice';
import requestsReducer from '@/features/requests/model/requestsSlice';

// ─── Root reducer через combineReducers ───────────────────────────────────

const rootReducer = combineReducers({
  users: usersReducer,
  skills: skillsReducer,
  auth: authReducer,
  favorite: favoriteReducer,
  filtration: filtrationReducer,
  requests: requestsReducer,
});

// ─── Options ──────────────────────────────────────────────────────────────

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Начальное состояние Redux — можно передать частично */
  preloadedState?: Partial<RootState>;
  /** Параметры MemoryRouter */
  routerProps?: MemoryRouterProps;
}

// ─── Helper ───────────────────────────────────────────────────────────────

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    routerProps = { initialEntries: ['/'] },
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) {
  const testStore = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const user = userEvent.setup();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={testStore}>
        <MemoryRouter {...routerProps}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return {
    store: testStore,
    user,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
