import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notification } from './Notification';
import { fn } from 'storybook/test';

const meta: Meta<typeof Notification> = {
  title: 'Features/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const NewSent: Story = {
  args: {
    id: '1',
    title: 'Анна предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    date: 'сегодня',
    isNew: true,
    onClick: fn(),
  },
};

export const NewCompleted: Story = {
  args: {
    id: '2',
    title: 'Николай принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: 'сегодня',
    isNew: true,
    onClick: fn(),
  },
};

export const ViewedSent: Story = {
  args: {
    id: '3',
    title: 'Максим предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    date: 'вчера',
    isNew: false,
  },
};

export const ViewedCompleted: Story = {
  args: {
    id: '4',
    title: 'Мария приняла ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: '2 дня назад',
    isNew: false,
  },
};
