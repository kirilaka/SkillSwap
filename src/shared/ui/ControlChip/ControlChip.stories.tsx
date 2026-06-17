import { Meta, StoryObj } from '@storybook/react-vite';
import { ControlChip } from './ControlChip';
import { fn } from 'storybook/test';
const meta: Meta<typeof ControlChip> = {
  title: 'SHARED/ControlChip',
  component: ControlChip,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ControlChip>;

export const Default: Story = {
  args: {
    label: 'Каталог',
    onClick: fn(),
  },
};

export const WithChevron: Story = {
  args: {
    label: 'Навыки',
    iconVariant: 'Chevron',
  },
};

export const WithChevronOpen: Story = {
  args: {
    label: 'Навыки',
    iconVariant: 'Chevron',
    isOpen: true,
  },
};

export const WithCross: Story = {
  args: {
    label: 'Навыки',
    iconVariant: 'Cross',
  },
};

export const Active: Story = {
  args: {
    label: 'Каталог',
    isActive: true,
  },
};
