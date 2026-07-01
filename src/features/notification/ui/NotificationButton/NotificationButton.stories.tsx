import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { NotificationButton } from './NotificationButton';
import type { NotificationProps } from '../Notification/Notification';

const mockStore = configureStore({
  reducer: {
    requests: () => ({ items: [], isLoading: false, error: null }),
    auth: () => ({ user: null, token: null, isAuth: false, isLoading: false, error: null }),
  },
});

const mockNew: NotificationProps[] = [
  {
    id: '1',
    title: 'Анна предлагает обмен',
    description: 'React',
    date: 'сегодня',
    isNew: true,
    requestId: 'r1',
  },
  {
    id: '2',
    title: 'Максим предлагает обмен',
    description: 'TypeScript',
    date: 'сегодня',
    isNew: true,
    requestId: 'r2',
  },
];

const mockOld: NotificationProps[] = [
  {
    id: '3',
    title: 'Николай принял обмен',
    description: 'Python',
    date: 'вчера',
    isNew: false,
    requestId: 'r3',
  },
  {
    id: '4',
    title: 'Сессия завершена',
    description: 'Figma',
    date: '2 дня назад',
    isNew: false,
    requestId: 'r4',
  },
];

const meta: Meta<typeof NotificationButton> = {
  title: 'Features/NotificationButton',
  component: NotificationButton,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof NotificationButton>;

export const Empty: Story = {
  args: { notificationsNew: [], notificationsOld: [], hasNew: false },
};

export const WithNewOnly: Story = {
  args: { notificationsNew: mockNew, notificationsOld: [], hasNew: true },
};

export const WithOldOnly: Story = {
  args: { notificationsNew: [], notificationsOld: mockOld, hasNew: false },
};

export const WithBoth: Story = {
  args: { notificationsNew: mockNew, notificationsOld: mockOld, hasNew: true },
};
