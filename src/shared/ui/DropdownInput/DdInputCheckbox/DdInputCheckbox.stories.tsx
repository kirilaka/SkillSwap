import type { Meta, StoryObj } from '@storybook/react-vite';
import { DdInputCheckbox } from './DdInputCheckbox';

const meta = {
  title: 'shared/DdInputCheckbox',
  component: DdInputCheckbox,
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
} satisfies Meta<typeof DdInputCheckbox>;

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
