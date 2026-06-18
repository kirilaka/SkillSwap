import { CheckboxSquare } from './CheckboxSquare';
import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta: Meta<typeof CheckboxSquare> = {
  title: 'Checkbox/CheckboxSquare',
  component: CheckboxSquare,
  parameters: {
    layout: 'centered',
  },
  args: {
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxSquare>;

export const Selected: Story = {
  args: {
    isActive: true,
    variant: 'check',
  },
};

export const Unselected: Story = {
  args: {
    isActive: false,
    variant: 'check',
  },
};
