import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterPanel } from './FilterPanel';

const meta: Meta<typeof FilterPanel> = {
  title: 'Features/Filtration/FilterPanel',
  component: FilterPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onFiltersChange: { action: 'filters changed' },
    onShowAllClick: { action: 'show all clicked' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

/** По умолчанию */
export const Default: Story = {
  args: {},
};
