import type { Meta, StoryObj } from '@storybook/react-vite';
import { Step2_PersonalData } from './Step2_PersonalData';

const meta = {
  title: 'Features/auth/Step2_PersonalData',
  component: Step2_PersonalData,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Step2_PersonalData>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cities: [
      { id: 'moscow', label: 'Москва' },
      { id: 'spb', label: 'Санкт-Петербург' },
      { id: 'nn', label: 'Нижний Новгород' },
      { id: 'kazan', label: 'Казань' },
      { id: 'ekb', label: 'Екатеринбург' },
      { id: 'novosibirsk', label: 'Новосибирск' },
      { id: 'samara', label: 'Самара' },
      { id: 'rostov', label: 'Ростов-на-Дону' },
    ],
    genders: [
      { id: 'male', label: 'Мужской' },
      { id: 'female', label: 'Женский' },
    ],
    categories: [
      {
        id: 'business',
        label: 'Бизнес и карьера',
        subcategories: [
          { id: 'management', label: 'Управление' },
          { id: 'marketing', label: 'Маркетинг' },
          { id: 'sales', label: 'Продажи' },
          { id: 'finance', label: 'Финансы' },
        ],
      },
      {
        id: 'art',
        label: 'Творчество и искусство',
        subcategories: [
          { id: 'drawing', label: 'Рисование' },
          { id: 'music', label: 'Музыка' },
          { id: 'photo', label: 'Фотография' },
          { id: 'design', label: 'Дизайн' },
        ],
      },
      {
        id: 'languages',
        label: 'Иностранные языки',
        subcategories: [
          { id: 'english', label: 'Английский' },
          { id: 'german', label: 'Немецкий' },
          { id: 'french', label: 'Французский' },
          { id: 'spanish', label: 'Испанский' },
        ],
      },
      {
        id: 'it',
        label: 'IT и программирование',
        subcategories: [
          { id: 'frontend', label: 'Frontend' },
          { id: 'backend', label: 'Backend' },
          { id: 'mobile', label: 'Мобильная разработка' },
          { id: 'qa', label: 'Тестирование' },
        ],
      },
      {
        id: 'sport',
        label: 'Спорт и здоровье',
        subcategories: [
          { id: 'fitness', label: 'Фитнес' },
          { id: 'running', label: 'Бег' },
          { id: 'yoga', label: 'Йога' },
          { id: 'nutrition', label: 'Правильное питание' },
        ],
      },
    ],
    onSubmit: (data) => {
      console.log(data);
    },
  },
};
