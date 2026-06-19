import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignUpButton } from './SignUpButton';

const meta: Meta<typeof SignUpButton> = {
  title: 'Features/Auth/SignUpButton',
  component: SignUpButton,
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
type Story = StoryObj<typeof SignUpButton>;

/** Кнопка регистрации по умолчанию */
export const Default: Story = {
  args: {
    // НЕ передаём onClick здесь — пусть Storybook подставит action сам
  },
};
