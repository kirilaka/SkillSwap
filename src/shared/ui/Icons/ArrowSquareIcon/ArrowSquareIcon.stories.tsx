import { Meta, StoryObj } from '@storybook/react-vite';

import { ArrowSquareIcon } from './ArrowSquareIcon';

const meta = {
  title: 'UI/Icons/ArrowSquare',
  component: ArrowSquareIcon,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ArrowSquareIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DirectionUp: Story = {
  args: {
    direction: 'Up',
  },
};

export const DirectionDown: Story = {
  args: {
    direction: 'Down',
  },
};

export const DirectionLeft: Story = {
  args: {
    direction: 'Left',
  },
};

export const DirectionRight: Story = {
  args: {
    direction: 'Right',
  },
};
