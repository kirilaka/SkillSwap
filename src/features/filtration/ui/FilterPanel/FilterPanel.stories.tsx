import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';

import { FilterPanel } from './FilterPanel';
import { store } from '@/store';

const meta: Meta<typeof FilterPanel> = {
  title: 'Features/Filtration/FilterPanel',
  component: FilterPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FilterPanel>;

export const Default: Story = {
  args: {},
};
