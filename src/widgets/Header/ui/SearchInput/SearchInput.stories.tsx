import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'widgets/Header/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
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
