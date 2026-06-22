import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderActions } from './HeaderActions';

const meta: Meta<typeof HeaderActions> = {
  title: 'Widgets/Header/HeaderActions',
  component: HeaderActions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    colorScheme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Текущая цветовая схема',
    },
    hasNewNotifications: { control: 'boolean' },
    user: { control: 'object', description: 'Текущий пользователь (для Storybook)' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderActions>;

const mockUser = {
  id: '1',
  name: 'Мария',
  email: 'maria@example.com',
  avatarUrl: null,
  createdAt: '',
};

/** Неавторизованный пользователь */
export const Unauthorized: Story = {
  args: {
    colorScheme: 'light',
    hasNewNotifications: false,
    user: null,
  },
};

/** Авторизованный пользователь */
export const Authorized: Story = {
  args: {
    colorScheme: 'light',
    hasNewNotifications: false,
    user: mockUser,
  },
};

/** Авторизованный с уведомлениями */
export const AuthorizedWithNotifications: Story = {
  args: {
    colorScheme: 'light',
    hasNewNotifications: true,
    user: mockUser,
  },
};

/** Тёмная тема */
export const DarkTheme: Story = {
  args: {
    colorScheme: 'dark',
    user: mockUser,
  },
};
