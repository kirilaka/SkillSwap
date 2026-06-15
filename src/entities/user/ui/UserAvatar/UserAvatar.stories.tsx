import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserAvatar } from './UserAvatar';
import { fn } from 'storybook/test';
import allAvatar from './image/Image.png';
import miniAvatar from './image/mini.png';
const meta: Meta<typeof UserAvatar> = {
  title: 'Entities/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof UserAvatar>;

const mockUser = {
  id: '1',
  name: 'Максим',
  email: 'maxim@gmail.com',
  avatarUrl: allAvatar,
  createdAt: '2026-01-01',
  city: 'Санкт-Петербург',
  age: 38,
};

export const NameFormat: Story = {
  name: 'формат юзер',
  args: {
    user: { ...mockUser, avatarUrl: miniAvatar },
    infoFormat: 'name',
  },
};

export const AllFormat: Story = {
  name: 'формат: вся информация',
  args: {
    user: { ...mockUser, avatarUrl: allAvatar },
    infoFormat: 'all',
  },
};
