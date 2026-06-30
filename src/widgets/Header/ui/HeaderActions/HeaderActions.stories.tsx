import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HeaderActions } from './HeaderActions';
import authReducer from '@/features/auth/model/authSlice';

const meta: Meta<typeof HeaderActions> = {
  title: 'Widgets/Header/HeaderActions',
  component: HeaderActions,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeaderActions>;

// Базовый store без preloadedState (тип выводится автоматически)
const createStore = () =>
  configureStore({
    reducer: { auth: authReducer },
  });

export const NotAuthenticated: Story = {
  decorators: [
    (Story) => (
      <Provider store={createStore()}>
        <Story />
      </Provider>
    ),
  ],
  args: {},
};

export const Authenticated: Story = {
  decorators: [
    (Story) => {
      const store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: {
          auth: {
            user: {
              id: 'user-1',
              name: 'Мария',
              email: 'maria@example.com',
              avatarUrl: null,
              createdAt: '',
              description: '',
              gender: 'female' as const,
              age: 25,
              city: 'Москва',
            },
            token: 'token123',
            isAuth: true,
            isLoading: false,
            error: null,
          },
        },
      });
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
  args: {},
};
