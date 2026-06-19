import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { UserCard } from './UserCard';

const meta: Meta<typeof UserCard> = {
  title: 'Entities/UserCard',
  component: UserCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    onButtonClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof UserCard>;

const mockUser = {
  id: '1',
  name: 'Иван',
  email: 'maxim@gmail.com',
  avatarUrl: '',
  createdAt: '2026-01-01',
  city: 'Санкт-Петербург',
  age: 38,
  description: '',
  skills: [],
};

export const StatusFalse: Story = {
  args: {
    user: mockUser,
    hasStatus: false,
  },
};

export const StatusTrue: Story = {
  args: {
    user: mockUser,
    hasStatus: true,
  },
};

export const NoUser: Story = {
  args: {
    user: null,
    hasStatus: false,
  },
};
