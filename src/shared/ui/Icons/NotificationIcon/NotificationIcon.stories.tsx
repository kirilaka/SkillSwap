import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationIcon } from './NotificationIcon';

const meta = {
  title: 'Icons/NotificationIcon',
  component: NotificationIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasNew: {
      control: 'boolean',
      description: 'Есть ли новые уведомления',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof NotificationIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoNew: Story = {
  args: {
    hasNew: false,
  },
};

export const WithNew: Story = {
  args: {
    hasNew: true,
  },
};
