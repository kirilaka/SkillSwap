import { Meta, StoryObj } from '@storybook/react-vite';
import { NavItem } from './NavigationItem';
import { fn } from 'storybook/test';
const meta: Meta<typeof NavItem> = {
  title: 'Widgets/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: {
    label: 'Каталог',
    onClick: fn(),
  },
};

export const WithArrow: Story = {
  args: {
    label: 'Навыки',
    hasArrow: true,
  },
};

export const WithArrowOpen: Story = {
  args: {
    label: 'Навыки',
    hasArrow: true,
    isOpen: true,
  },
};
