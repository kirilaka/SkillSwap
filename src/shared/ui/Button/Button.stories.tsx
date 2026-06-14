import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { fn } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'stories/Button/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Partial: Story = {
  args: {
    label: 'Кнопка',
    onClick: fn(),
    buttonType: 'primary',
  },
};

export const Full: Story = {
  args: {
    label: 'Кнопка',
    onClick: fn(),
    buttonType: 'secondary',
  },
};

export const None: Story = {
  args: {
    label: 'Кнопка',
    onClick: fn(),
    buttonType: 'tertiary',
  },
};
