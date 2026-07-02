import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterCategory } from './FilterCategory';
import { fn } from 'storybook/test';

const meta: Meta<typeof FilterCategory> = {
  title: 'FEATURES/Filtration/FilterCategory',
  component: FilterCategory,
  parameters: {
    layout: 'centered',
  },
  args: {
    onCategoryToggle: fn(),
    onSubcategoryToggle: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof FilterCategory>;

/**
 * История, максимально приближенная к референсу "Навыки"
 */
export const SkillsFull: Story = {
  args: {
    title: 'Навыки',
    filters: [
      {
        id: '1',
        label: 'Бизнес и карьера',
        hasSubFilters: false,
        checkboxVariant: 'squareCheck',
        isActive: false,
      },
      {
        id: '2',
        label: 'Творчество и искусство',
        hasSubFilters: true,
        checkboxVariant: 'squareMinus',
        isActive: false,
        subFilters: [
          {
            id: '2.1',
            label: 'Рисование и иллюстрация',
            checkboxVariant: 'squareCheck',
            isActive: false,
          },
          { id: '2.2', label: 'Фотография', checkboxVariant: 'squareCheck', isActive: false },
          { id: '2.3', label: 'Видеомонтаж', checkboxVariant: 'squareCheck', isActive: false },
          { id: '2.4', label: 'Музыка и звук', checkboxVariant: 'squareCheck', isActive: true }, // Выбранный элемент
          {
            id: '2.5',
            label: 'Актёрское мастерство',
            checkboxVariant: 'squareCheck',
            isActive: false,
          },
        ],
      },
      {
        id: '3',
        label: 'Иностранные языки',
        hasSubFilters: false,
        checkboxVariant: 'squareCheck',
        isActive: false,
      },
      {
        id: '4',
        label: 'Здоровье и лайфстайл',
        hasSubFilters: true,
        checkboxVariant: 'squareMinus',
        isActive: false,
        subFilters: [
          { id: '4.1', label: 'Йога', checkboxVariant: 'squareCheck', isActive: false },
          { id: '4.2', label: 'Медитация', checkboxVariant: 'squareCheck', isActive: false },
        ],
      },
    ],
  },
};

/**
 * Только плоский список без веток
 */
export const OnlyFlat: Story = {
  args: {
    title: 'Дополнительно',
    filters: [
      {
        id: '5',
        label: 'Дом и уют',
        hasSubFilters: false,
        checkboxVariant: 'squareCheck',
        isActive: false,
      },
      {
        id: '6',
        label: 'Программирование',
        hasSubFilters: false,
        checkboxVariant: 'squareCheck',
        isActive: false,
      },
    ],
  },
};

/**
 * Проверка отображения вложенных активных фильтров (Индикатор родителя)
 */
export const ActiveIndeterminate: Story = {
  args: {
    title: 'Активные подкатегории',
    filters: [
      {
        id: 'sub-active',
        label: 'Категория с активным ребенком',
        hasSubFilters: true,
        checkboxVariant: 'squareMinus',
        isActive: false,
        subFilters: [
          { id: 'sub-1', label: 'Я активен', checkboxVariant: 'squareCheck', isActive: true },
          { id: 'sub-2', label: 'Я нет', checkboxVariant: 'squareCheck', isActive: false },
        ],
      },
    ],
  },
};
