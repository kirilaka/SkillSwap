import type { Meta, StoryObj } from '@storybook/react-vite';

import { Logo } from './Logo';

const meta = {
  title: 'shared/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
