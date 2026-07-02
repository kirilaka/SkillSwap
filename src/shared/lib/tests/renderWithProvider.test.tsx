import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { renderWithProviders } from './renderWithProvider';

// ─── Dummy компоненты для проверки ────────────────────────────────────────

function RouteChecker() {
  const location = useLocation();
  return <div data-testid="route">{location.pathname}</div>;
}

function ReduxChecker() {
  const isAuth = useSelector((state: RootState) => state.auth?.isAuth);
  return <div data-testid="auth">{isAuth ? 'authed' : 'guest'}</div>;
}

// ─── Tests ────────────────────────────────────────────────────────────────

describe('renderWithProviders', () => {
  it('рендерит компонент без ошибок', () => {
    renderWithProviders(<div data-testid="hello">Hello</div>);

    expect(screen.getByTestId('hello')).toHaveTextContent('Hello');
  });

  it('настраивает MemoryRouter с initialEntries', () => {
    renderWithProviders(<RouteChecker />, {
      routerProps: { initialEntries: ['/favorites'] },
    });

    expect(screen.getByTestId('route')).toHaveTextContent('/favorites');
  });

  it('передаёт preloadedState в Redux', () => {
    renderWithProviders(<ReduxChecker />, {
      preloadedState: {
        auth: {
          user: {
            id: '1',
            name: 'Test',
            email: 'test@example.com',
            avatarUrl: null,
            createdAt: '',
            description: '',
            gender: 'female',
            age: 25,
            city: 'Москва',
          },
          token: 'tok',
          isAuth: true,
          isLoading: false,
          error: null,
        },
      },
    });

    expect(screen.getByTestId('auth')).toHaveTextContent('authed');
  });

  it('возвращает userEvent для взаимодействия', async () => {
    const { user } = renderWithProviders(<button onClick={() => {}}>Click me</button>);

    expect(user).toBeDefined();
    expect(user.click).toBeInstanceOf(Function);
  });

  it('возвращает store для дополнительных проверок', () => {
    const { store } = renderWithProviders(<div>test</div>);

    expect(store.getState).toBeInstanceOf(Function);
    expect(store.dispatch).toBeInstanceOf(Function);
  });
});
