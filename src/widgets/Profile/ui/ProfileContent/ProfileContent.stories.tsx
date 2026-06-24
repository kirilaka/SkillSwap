import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileContent, type ProfileContentUser } from './ProfileContent';

const mockUser: ProfileContentUser = {
  id: '1',
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  birthday: '1995-05-15',
  gender: 'male',
  city: 'moscow', // Исправлено: передаем ID 'moscow' вместо строки 'Москва'
  description: 'Фронтенд разработчик. Люблю React и TypeScript.',
  avatarUrl: 'https://unsplash.com', // Исправлено: прямая ссылка на изображение для корректного рендера аватара
  createdAt: '2026-01-01T00:00:00.000Z',
};

const meta: Meta<typeof ProfileContent> = {
  title: 'entities/User/ProfileContent',
  component: ProfileContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof ProfileContent>;

export const Default: Story = {
  args: {
    user: mockUser,
  },
};

export const UserNotFound: Story = {
  args: {
    user: null,
  },
};
