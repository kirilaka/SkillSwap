import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notification } from './Notification';
import { fn } from 'storybook/test';

const mockUser = {
  id: '1',
  name: 'Николай',
  email: 'nikolay@example.com',
  avatarUrl: null,
  createdAt: '2024-01-15',
};

const meta: Meta<typeof Notification> = {
  title: 'Features/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
    user: mockUser,
    date: new Date(),
  },
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const NewSent: Story = {
  args: {
    viewState: 'new',
    exchangeStatus: 'sent',
    date: new Date(),
  },
};

export const NewCompleted: Story = {
  args: {
    viewState: 'new',
    exchangeStatus: 'completed',
    date: new Date(),
  },
};

export const ViewedSent: Story = {
  args: {
    viewState: 'viewed',
    exchangeStatus: 'sent',
    date: new Date(),
  },
};

export const ViewedCompleted: Story = {
  args: {
    viewState: 'viewed',
    exchangeStatus: 'completed',
    date: new Date(),
  },
};
