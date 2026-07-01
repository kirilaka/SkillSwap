import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';

import { FilterPanel } from './FilterPanel';
import { store } from '@/store';
import { configureStore } from '@reduxjs/toolkit';
import { filtrationSlice } from '../../models/filtrationSlice';

const mockStore = configureStore({
  reducer: {
    filtration: filtrationSlice.reducer,
    users: () => ({
      items: [
        { id: '1', city: 'Москва', skills: [], gender: 'male' },
        { id: '2', city: 'Санкт-Петербург', skills: [], gender: 'female' },
        { id: '3', city: 'Москва', skills: [], gender: 'male' },
      ],
    }),
  },
});

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

export const WithCities: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
};
