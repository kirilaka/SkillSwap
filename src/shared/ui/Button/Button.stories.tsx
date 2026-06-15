import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { fn } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Кнопка',
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    buttonType: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    buttonType: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    buttonType: 'tertiary',
  },
};

export const Disabled: Story = {
  args: {
    buttonType: 'primary',
    disabled: true,
  },
};
