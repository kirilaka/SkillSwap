import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserAvatar } from './UserAvatar';
import { fn } from 'storybook/test';
const meta: Meta<typeof UserAvatar> = {
  title: 'Entities/UserAvatar/UserAvatar',
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
  name: 'Максим Максимов',
  email: 'maxim@gmail.com',
  avatarUrl: 'https://placehold.co/100',
  createdAt: '2026-01-01',
  city: 'Санкт-Петербург',
  age: 38,
};

export const NameFormat: Story = {
  name: 'формат юзер',
  args: {
    user: mockUser,
    infoFormat: 'name',
  },
};

export const AllFprmat: Story = {
  name: 'формат: вся информация',
  args: {
    user: mockUser,
    infoFormat: 'all',
  },
};
