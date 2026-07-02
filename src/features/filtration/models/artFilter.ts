import { FilterItemType } from './types';

export interface MockFilterItem extends FilterItemType {
  id: string;
  isActive?: boolean;
  subFilters?: MockFilterItem[];
}

// Навыки (полный список из макета)
export const skillsFilterList: MockFilterItem[] = [
  {
    id: '1',
    label: 'Бизнес и карьера',
    hasSubFilters: true,
    checkboxVariant: 'squareMinus',
    isActive: false,
    subFilters: [
      { id: '1.1', label: 'Управление командой', checkboxVariant: 'squareCheck', isActive: false },
      { id: '1.2', label: 'Маркетинг и реклама', checkboxVariant: 'squareCheck', isActive: false },
      { id: '1.3', label: 'Продажи и переговоры', checkboxVariant: 'squareCheck', isActive: false },
      { id: '1.4', label: 'Личный бренд', checkboxVariant: 'squareCheck', isActive: false },
      {
        id: '1.5',
        label: 'Резюме и собеседование',
        checkboxVariant: 'squareCheck',
        isActive: false,
      },
      { id: '1.6', label: 'Тайм-менеджмент', checkboxVariant: 'squareCheck', isActive: false },
      { id: '1.7', label: 'Проектное управление', checkboxVariant: 'squareCheck', isActive: false },
      { id: '1.8', label: 'Предпринимательство', checkboxVariant: 'squareCheck', isActive: false },
    ],
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
      { id: '2.4', label: 'Музыка и звук', checkboxVariant: 'squareCheck', isActive: false },
      { id: '2.5', label: 'Актёрское мастерство', checkboxVariant: 'squareCheck', isActive: false },
      { id: '2.6', label: 'Креативное письмо', checkboxVariant: 'squareCheck', isActive: false },
      { id: '2.7', label: 'Арт-терапия', checkboxVariant: 'squareCheck', isActive: false },
      { id: '2.8', label: 'Декор и DIY', checkboxVariant: 'squareCheck', isActive: false },
    ],
  },
  {
    id: '3',
    label: 'Иностранные языки',
    hasSubFilters: true,
    checkboxVariant: 'squareMinus',
    isActive: false,
    subFilters: [
      { id: '3.1', label: 'Английский', checkboxVariant: 'squareCheck', isActive: false },
      { id: '3.2', label: 'Французский', checkboxVariant: 'squareCheck', isActive: false },
      { id: '3.3', label: 'Испанский', checkboxVariant: 'squareCheck', isActive: false },
      { id: '3.4', label: 'Немецкий', checkboxVariant: 'squareCheck', isActive: false },
      { id: '3.5', label: 'Китайский', checkboxVariant: 'squareCheck', isActive: false },
      { id: '3.6', label: 'Японский', checkboxVariant: 'squareCheck', isActive: false },
      {
        id: '3.7',
        label: 'Подготовка к экзаменам (IELTS, TOEFL)',
        checkboxVariant: 'squareCheck',
        isActive: false,
      },
    ],
  },
  {
    id: '4',
    label: 'Образование и развитие',
    hasSubFilters: true,
    checkboxVariant: 'squareMinus',
    isActive: false,
    subFilters: [
      { id: '4.1', label: 'Личностное развитие', checkboxVariant: 'squareCheck', isActive: false },
      { id: '4.2', label: 'Навыки обучения', checkboxVariant: 'squareCheck', isActive: false },
      { id: '4.3', label: 'Когнитивные техники', checkboxVariant: 'squareCheck', isActive: false },
      { id: '4.4', label: 'Скорочтение', checkboxVariant: 'squareCheck', isActive: false },
      { id: '4.5', label: 'Навыки преподавания', checkboxVariant: 'squareCheck', isActive: false },
      { id: '4.6', label: 'Коучинг', checkboxVariant: 'squareCheck', isActive: false },
    ],
  },
  {
    id: '5',
    label: 'Дом и уют',
    hasSubFilters: true,
    checkboxVariant: 'squareMinus',
    isActive: false,
    subFilters: [
      { id: '5.1', label: 'Уборка и организация', checkboxVariant: 'squareCheck', isActive: false },
      { id: '5.2', label: 'Домашние финансы', checkboxVariant: 'squareCheck', isActive: false },
      { id: '5.3', label: 'Приготовление еды', checkboxVariant: 'squareCheck', isActive: false },
      { id: '5.4', label: 'Домашние растения', checkboxVariant: 'squareCheck', isActive: false },
      { id: '5.5', label: 'Ремонт', checkboxVariant: 'squareCheck', isActive: false },
      { id: '5.6', label: 'Хранение вещей', checkboxVariant: 'squareCheck', isActive: false },
    ],
  },
  {
    id: '6',
    label: 'Здоровье и лайфстайл',
    hasSubFilters: true,
    checkboxVariant: 'squareMinus',
    isActive: false,
    subFilters: [
      { id: '6.1', label: 'Йога и медитация', checkboxVariant: 'squareCheck', isActive: false },
      { id: '6.2', label: 'Питание и ЗОЖ', checkboxVariant: 'squareCheck', isActive: false },
      { id: '6.3', label: 'Ментальное здоровье', checkboxVariant: 'squareCheck', isActive: false },
      { id: '6.4', label: 'Осознанность', checkboxVariant: 'squareCheck', isActive: false },
      {
        id: '6.5',
        label: 'Физические тренировки',
        checkboxVariant: 'squareCheck',
        isActive: false,
      },
      { id: '6.6', label: 'Сон и восстановление', checkboxVariant: 'squareCheck', isActive: false },
      {
        id: '6.7',
        label: 'Баланс жизни и работы',
        checkboxVariant: 'squareCheck',
        isActive: false,
      },
    ],
  },
];

// Тип обмена (радио-кнопки)
export const exchangeTypeFilterList: MockFilterItem[] = [
  { id: 'all', label: 'Всё', hasSubFilters: false, checkboxVariant: 'circle', isActive: true },
  {
    id: 'teach',
    label: 'Могу научить',
    hasSubFilters: false,
    checkboxVariant: 'circle',
    isActive: false,
  },
  {
    id: 'learn',
    label: 'Хочу научиться',
    hasSubFilters: false,
    checkboxVariant: 'circle',
    isActive: false,
  },
];

// Пол автора (радио-кнопки)
export const genderFilterList: MockFilterItem[] = [
  {
    id: 'any',
    label: 'Не имеет значения',
    hasSubFilters: false,
    checkboxVariant: 'circle',
    isActive: true,
  },
  {
    id: 'male',
    label: 'Мужской',
    hasSubFilters: false,
    checkboxVariant: 'circle',
    isActive: false,
  },
  {
    id: 'female',
    label: 'Женский',
    hasSubFilters: false,
    checkboxVariant: 'circle',
    isActive: false,
  },
];

// Старый мок для обратной совместимости
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
      { id: '2.4', label: 'Музыка и звук', checkboxVariant: 'squareCheck', isActive: true },
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
