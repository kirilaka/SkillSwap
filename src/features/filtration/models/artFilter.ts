// src/features/filtration/model/artFilter.ts
import { FilterItemType } from './types';

export interface MockFilterItem extends FilterItemType {
  id: string;
  isActive?: boolean;
  subFilters?: MockFilterItem[];
}

export const artFilterMock: MockFilterItem[] = [
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
      { id: '2.4', label: 'Музыка и звук', checkboxVariant: 'squareCheck', isActive: true }, // для наглядности в сторибуке
    ],
  },
  {
    id: '3',
    label: 'Иностранные языки',
    hasSubFilters: false,
    checkboxVariant: 'squareCheck',
    isActive: false,
  },
];
