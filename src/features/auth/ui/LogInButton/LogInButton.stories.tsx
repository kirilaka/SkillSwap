import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogInButton } from './LogInButton';

const meta: Meta<typeof LogInButton> = {
  title: 'Features/Auth/LogInButton',
  component: LogInButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика',
    },
    className: {
      control: 'text',
      description: 'Доп. классы',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogInButton>;

/** Кнопка входа по умолчанию */
export const Default: Story = {
  args: {
    // НЕ передаём onClick здесь — пусть Storybook подставит action сам
  },
};
