import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationButton } from './NotificationButton';
import type { NotificationType } from './NotificationButton';
import { User } from '@/shared/types';

// --- Mock Data ---
const mockUser: User = {
  id: '123',
  name: 'Анна',
  email: 'anna@example.com',
  avatarUrl: '/avatars/anna.jpg',
  createdAt: new Date().toISOString(),
};

const mockUser2: User = {
  id: '456',
  name: 'Мария',
  email: 'maria@example.com',
  avatarUrl: '/avatars/maria.jpg',
  createdAt: new Date().toISOString(),
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const mockNotificationNew1: NotificationType = {
  id: '1',
  viewState: 'new',
  exchangeStatus: 'completed',
  date: new Date(Date.now() - 1000 * 60 * 5),
  user: mockUser,
};

const mockNotificationNew2: NotificationType = {
  id: '2',
  viewState: 'new',
  exchangeStatus: 'sent',
  date: new Date(today.getTime() - 1000 * 60 * 30),
  user: mockUser2,
};

const mockNotificationOld1: NotificationType = {
  id: '3',
  viewState: 'viewed',
  exchangeStatus: 'sent',
  date: new Date(today.getTime() - 1000 * 60 * 60 * 24),
  user: mockUser,
};

const mockNotificationOld2: NotificationType = {
  id: '4',
  viewState: 'viewed',
  exchangeStatus: 'completed',
  date: new Date(today.getTime() - 1000 * 60 * 60 * 48),
  user: mockUser2,
};

// --- Mock Data Arrays ---
const emptyNotifications = {
  notificationsNew: null,
  notificationsOld: null,
};

const newOnly = {
  notificationsNew: [mockNotificationNew1, mockNotificationNew2],
  notificationsOld: null,
};

const oldOnly = {
  notificationsNew: null,
  notificationsOld: [mockNotificationOld1, mockNotificationOld2],
};

const both = {
  notificationsNew: [mockNotificationNew1, mockNotificationNew2],
  notificationsOld: [mockNotificationOld1, mockNotificationOld2],
};

// --- Meta ---
const meta: Meta<typeof NotificationButton> = {
  title: 'Features/NotificationButton',
  component: NotificationButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<{
  hasNew?: boolean;
  notificationsNew?: NotificationType[] | null;
  notificationsOld?: NotificationType[] | null;
  className?: string;
  isAuthorized?: boolean;
}>;

// --- Stories ---

export const Empty: Story = {
  args: { ...emptyNotifications, hasNew: false },
};

export const WithNewOnly: Story = {
  args: { ...newOnly, hasNew: true },
};

export const WithOldOnly: Story = {
  args: { ...oldOnly, hasNew: false },
};

export const WithBoth: Story = {
  args: { ...both, hasNew: true },
};
