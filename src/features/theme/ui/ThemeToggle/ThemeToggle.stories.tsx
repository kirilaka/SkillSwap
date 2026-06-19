import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeToggle } from './ThemeToggle';
const meta: Meta<typeof ThemeToggle> = {
  title: 'features/theme/ui/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: {
    onClick: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

// 2. Сценарий для светлой темы
export const LightScheme: Story = {
  args: {
    colorScheme: 'light',
  },
};

// 3. Сценарий для тёмной темы
export const DarkScheme: Story = {
  args: {
    colorScheme: 'dark',
  },
};
