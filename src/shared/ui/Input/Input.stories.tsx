import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'shared/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Блокировка инпута',
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер',
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле',
    },
    minLength: {
      control: 'number',
      description: 'Минимальная длина',
    },
    maxLength: {
      control: 'number',
      description: 'Максимальная длина',
    },
    pattern: {
      control: 'text',
      description: 'Регулярное выражение',
    },
    showErrorOn: {
      control: { type: 'select', options: ['change', 'blur', 'submit'] },
      description: 'Когда показывать ошибку',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    placeholder: 'Введите имя',
  },
};

export const Required: Story = {
  args: {
    required: true,
    showErrorOn: 'blur',
  },
  play: async ({ canvasElement }) => {
    // Эмуляция потери фокуса для показа ошибки
    const input = canvasElement.querySelector('input');
    if (input) {
      input.focus();
      input.blur();
    }
  },
};

export const Validation: Story = {
  args: {
    required: true,
    minLength: 3,
    maxLength: 10,
    pattern: '^[а-яА-ЯёЁa-zA-Z]+$',
    showErrorOn: 'change',
    placeholder: 'Только буквы, от 3 до 10',
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) {
      input.focus();
      input.value = 'abc';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};

export const CustomValidation: Story = {
  args: {
    placeholder: 'Введите email',
    showErrorOn: 'blur',
    validate: (value) => {
      if (!value.includes('@')) {
        return 'Некорректный email';
      }
      return null;
    },
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) {
      input.focus();
      input.value = 'invalid-email';
      input.blur();
    }
  },
};
