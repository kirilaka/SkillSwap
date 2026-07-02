import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { SearchInput } from './SearchInput';
import { store } from '@/store';

const meta: Meta<typeof SearchInput> = {
  title: 'widgets/Header/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

//  Базовое (дефолтное) состояние компонента
export const Default: Story = {
  args: {
    placeholder: 'Искать навык',
  },
};

// Состояние, когда в инпут уже введен текст
export const WithValue: Story = {
  args: {
    placeholder: 'Искать навык',
    value: 'React TypeScript',
  },
};
