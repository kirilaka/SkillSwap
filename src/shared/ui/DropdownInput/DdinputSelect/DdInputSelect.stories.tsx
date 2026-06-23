import type { Meta, StoryObj } from '@storybook/react-vite';
import { DdInputSelect } from './DdInputSelect';

const meta = {
  title: 'shared/DdInputSelect',
  component: DdInputSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DdInputSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Выберите категорию',
    items: [
      { id: '1', label: 'HTML' },
      { id: '2', label: 'CSS' },
      { id: '3', label: 'React' },
    ],
  },
};

export const Scroll: Story = {
  args: {
    placeholder: 'Выберите категорию',
    items: [
      { id: '1', label: 'HTML' },
      { id: '2', label: 'CSS' },
      { id: '3', label: 'React' },
      { id: '4', label: 'JS' },
      { id: '5', label: 'TypeScript' },
      { id: '6', label: 'Питон' },
      { id: '7', label: 'Дайте работу' },
    ],
  },
};
