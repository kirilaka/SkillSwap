import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { UserCard } from './UserCard';
import { Skill } from '@/shared/types';
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
  description: 'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
  skills: [
    { title: 'Английский язык', type: 'teach', category: 'language' },
    { title: 'React', type: 'teach', category: 'education' },
    { title: 'Танцевать', type: 'learn', category: 'art' },
    { title: 'Python', type: 'learn', category: 'education' },
    { title: 'Figma', type: 'learn', category: 'education' },
  ] as Skill[],
};

export const StatusFalse: Story = {
  args: {
    user: mockUser,
    hasDescription: false,
  },
};

export const StatusTrue: Story = {
  args: {
    user: mockUser,
    hasDescription: true,
  },
};

export const NoUser: Story = {
  args: {
    user: null,
    hasDescription: false,
  },
};
