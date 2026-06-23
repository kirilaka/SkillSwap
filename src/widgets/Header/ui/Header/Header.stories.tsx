import { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
