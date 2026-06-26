import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionCards } from './SectionCards';
import { UserInfo } from '@/shared/types';
import { fn } from 'storybook/test';

import usersData from '@/../public/db/users.json';

const users = usersData.users as UserInfo[];

const meta = {
  title: 'widgets/MainSection/SectionCards',
  component: SectionCards,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    users,
  },
} satisfies Meta<typeof SectionCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Популярное',
    variant: 'three',
    onClick: fn(),
  },
  render: (args) => (
    <div style={{ width: '1020px' }}>
      <SectionCards {...args} />
    </div>
  ),
};

export const AllCards: Story = {
  args: {
    title: 'Популярное',
    variant: 'all',
    onClick: fn(),
  },
  render: (args) => (
    <div style={{ width: '1020px' }}>
      <SectionCards {...args} />
    </div>
  ),
};
