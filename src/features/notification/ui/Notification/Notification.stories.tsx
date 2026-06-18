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
    viewState: 'new',
    exchangeStatus: 'sent',
  },
  argTypes: {
    viewState: {
      control: { type: 'select' },
      options: ['new', 'viewed'],
    },
    exchangeStatus: {
      control: { type: 'select' },
      options: ['sent', 'completed'],
    },
    date: {
      control: { type: 'date' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const NotificationDefault: Story = {};
