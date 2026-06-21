import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownInput } from './DropdownInput';

const meta = {
  title: 'shared/DropdownInput',
  component: DropdownInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DropdownInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
