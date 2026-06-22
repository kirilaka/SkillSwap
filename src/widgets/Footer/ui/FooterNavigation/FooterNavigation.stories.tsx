import type { Meta, StoryObj } from '@storybook/react-vite';
import { FooterNavigation } from './FooterNavigation';

const meta: Meta<typeof FooterNavigation> = {
  title: 'widgets/FooterNavigation',
  component: FooterNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof FooterNavigation>;

export const Default: Story = {};
