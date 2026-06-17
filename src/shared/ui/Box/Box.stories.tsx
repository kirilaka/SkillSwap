import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './Box';

const meta = {
  title: 'UI/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Содержимое Box',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Содержимое Box',
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div>
        <h3>Иван</h3>
        <p>Санкт-Петербург, 34 года</p>
        <p>
          <strong>Может научить:</strong> Игра на барабанах
        </p>
        <p>
          <strong>Хочет научиться:</strong> Тайм менеджмент, Медитация, +2
        </p>
        <button>Подробнее</button>
      </div>
    ),
  },
};

export const Empty: Story = {
  args: {
    children: null,
  },
};
