import { Meta, StoryObj } from '@storybook/react-vite';
import { FilterItem } from './FilterItem';
import { fn } from 'storybook/test';
const meta: Meta<typeof FilterItem> = {
  title: 'FEATURES/Filtration/FilterItem',
  component: FilterItem,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof FilterItem>;

export const Default: Story = {
  args: {
    id: '1',
    label: 'Всё',
    onCheckboxClick: fn(),
    onTextClick: fn(),
    checkboxVariant: 'circle',
  },
};

export const Active: Story = {
  args: {
    id: '2',
    label: 'Всё',
    isActive: true,
    onCheckboxClick: fn(),
    onTextClick: fn(),
    checkboxVariant: 'circle',
  },
};

export const WithSubFilters: Story = {
  args: {
    id: '3',
    label: 'Творчество и искусство',
    hasSubFilters: true,
    isOpen: false,
    onCheckboxClick: fn(),
    onTextClick: fn(),
    checkboxVariant: 'squareMinus',
  },
};

export const WithSubFiltersOpen: Story = {
  args: {
    id: '4',
    label: 'Иностранные языки',
    hasSubFilters: true,
    isOpen: true,
    checkboxVariant: 'squareMinus',
  },
};

export const SquareCheck: Story = {
  args: {
    id: '5',
    label: 'Квадратный чекбокс',
    checkboxVariant: 'squareCheck',
  },
};

export const SquareMinus: Story = {
  args: {
    id: '6',
    label: 'Частичный выбор',
    checkboxVariant: 'squareMinus',
  },
};
