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
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxCircle>;

export const Active: Story = {
  args: {
    isActive: true,
  },
};

export const IsNotActive: Story = {
  args: {
    isActive: false,
  },
};
