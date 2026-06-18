import { CheckboxCircle } from './CheckboxCircle';
import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof CheckboxCircle> = {
  title: 'Checkbox/CheckboxCircle',
  component: CheckboxCircle,
  parameters: {
    layout: 'centered',
  },
  args: {
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxCircle>;

export const Selected: Story = {
  args: {
    isActive: true,
  },
};

export const Unselected: Story = {
  args: {
    isActive: false,
  },
};
