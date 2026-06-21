import { Meta, StoryObj } from '@storybook/react-vite';
import { FilterItem } from '../ui/FilterItem/FilterItem';
import { FilterCategory } from './FilterCategory';
import { fn } from 'storybook/test';
const meta: Meta<typeof FilterCategory> = {
  title: 'FEATURES/FilterCategory',
  component: FilterCategory,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof FilterCategory>;

export const DefaultClosed: Story = {
  args: {
    title: 'Творчество и искусство',
    filters: [
      <FilterItem
        key="1"
        id="paint"
        label="Рисование и иллюстрация"
        checkboxVariant="squareCheck"
        onCheckboxClick={fn()}
        onTextClick={fn()}
      />,
      <FilterItem
        key="2"
        id="photo"
        label="Фотография"
        checkboxVariant="squareCheck"
        onCheckboxClick={fn()}
        onTextClick={fn()}
      />,
      <FilterItem
        key="3"
        id="video"
        label="Видеомонтаж"
        checkboxVariant="squareCheck"
        onCheckboxClick={fn()}
        onTextClick={fn()}
      />,
    ],
  },
};

export const LongListDebug: Story = {
  args: {
    title: 'Творчество и искусство (Полный список)',
    filters: [
      <FilterItem
        key="1"
        id="paint"
        label="Рисование и иллюстрация"
        checkboxVariant="squareCheck"
        onCheckboxClick={fn()}
        onTextClick={fn()}
      />,
      <FilterItem
        key="2"
        id="photo"
        label="Фотография"
        checkboxVariant="squareCheck"
        onCheckboxClick={fn()}
        onTextClick={fn()}
      />,
      <FilterItem
        key="3"
        id="video"
        label="Видеомонтаж"
        checkboxVariant="squareCheck"
        onCheckboxClick={fn()}
        onTextClick={fn()}
      />,
      <FilterItem
        key="4"
        id="music"
        label="Музыка и звук"
        checkboxVariant="squareCheck"
        isActive={true}
        onCheckboxClick={fn()}
        onTextClick={fn()}
      />, // один выберем для наглядности
      <FilterItem
        key="5"
        id="actor"
        label="Актёрское мастерство"
        checkboxVariant="squareCheck"
        onCheckboxClick={fn()}
        onTextClick={fn()}
      />,
      <FilterItem
        key="6"
        id="write"
        label="Креативное письмо"
        checkboxVariant="squareCheck"
        onCheckboxClick={fn()}
        onTextClick={fn()}
      />,
      <FilterItem key="7" id="art" label="Арт-терапия" checkboxVariant="squareCheck" />,
      <FilterItem key="8" id="diy" label="Декор и DIY" checkboxVariant="squareCheck" />,
    ],
  },
};

export const SingleCategory: Story = {
  args: {
    title: 'Бизнес и карьера',
    filters: [],
  },
};
