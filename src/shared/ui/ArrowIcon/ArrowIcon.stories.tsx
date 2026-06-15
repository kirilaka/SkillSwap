import { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowIcon } from './ArrowIcon';

const meta: Meta<typeof ArrowIcon> = {
  title: 'Shared/ArrowIcon/ArrowIcon',
  component: ArrowIcon,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ArrowIcon>;

export const HorizontalOpen: Story = {
  args: {
    orientation: 'horizontal',
    isOpen: true,
  },
};

export const HorizontalClosed: Story = {
  args: {
    orientation: 'horizontal',
    isOpen: false,
  },
};

export const VerticalOpen: Story = {
  args: {
    orientation: 'vertical',
    isOpen: true,
  },
};

export const VerticalClosed: Story = {
  args: {
    orientation: 'vertical',
    isOpen: false,
  },
};
