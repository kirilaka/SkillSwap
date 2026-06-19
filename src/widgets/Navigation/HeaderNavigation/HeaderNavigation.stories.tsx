import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderNavigation } from './HeaderNavigation';

const meta: Meta<typeof HeaderNavigation> = {
  title: 'widgets/HeaderNavigation',
  component: HeaderNavigation,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HeaderNavigation>;

export const Default: Story = {
  args: {},
};
