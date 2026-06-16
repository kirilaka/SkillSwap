import { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronIcon } from './ChevronIcon';

const meta: Meta<typeof ChevronIcon> = {
  title: 'UI/Icons/Chevron',
  component: ChevronIcon,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ChevronIcon>;
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
