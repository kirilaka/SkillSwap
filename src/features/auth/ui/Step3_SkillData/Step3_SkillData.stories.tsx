import type { Meta, StoryObj } from '@storybook/react-vite';
import { Step3_SkillData } from './Step3_SkillData';

// 1. Настройка метаданных компонента
const meta: Meta<typeof Step3_SkillData> = {
  title: 'Features/Profile/Step3_SkillData', // Путь к компоненту в боковой панели Storybook
  component: Step3_SkillData,
  parameters: {
    layout: 'centered', // Центрирует компонент на холсте Storybook
  },
  tags: ['autodocs'], // Автоматически генерирует документацию (вкладка Docs)
  argTypes: {
    onSubmit: { action: 'submitted' }, // Позволяет отслеживать клики в панели Actions
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 2. Базовая история (Пустая форма)
export const Default: Story = {
  args: {
    onSubmit: () => alert('Форма отправлена (вызван onSubmit)'),
  },
};

// 3. История, имитирующая добавление кастомных классов стилей сверху
export const WithCustomClass: Story = {
  args: {
    ...Default.args,
    className: 'custom-form-wrapper',
  },
};
