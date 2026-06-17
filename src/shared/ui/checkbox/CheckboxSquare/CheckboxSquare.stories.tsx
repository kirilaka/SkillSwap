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
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxSquare>;

export const Check: Story = {
  args: {
    isActive: true,
    variant: 'check',
  },
};

export const Minus: Story = {
  args: {
    isActive: true,
    variant: 'minus',
  },
};

export const IsNotActive: Story = {
  args: {
    isActive: false,
    variant: 'check',
  },
};
