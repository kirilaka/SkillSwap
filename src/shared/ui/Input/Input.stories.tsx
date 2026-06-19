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
