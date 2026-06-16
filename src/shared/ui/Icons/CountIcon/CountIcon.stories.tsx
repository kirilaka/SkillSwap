import { Meta, StoryObj } from '@storybook/react-vite';
import { CountIcon } from './CountIcon';

const meta: Meta<typeof CountIcon> = {
  title: 'UI/Icons/Count',
  component: CountIcon,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CountIcon>;
export const Default: Story = {};
