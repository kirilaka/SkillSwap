import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'shared/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'date' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    onChange: { action: 'date changed' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    placeholder: 'Выберите дату встречи',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(undefined);

    return (
      <div style={{ width: '300px' }}>
        <DatePicker
          {...args}
          value={value}
          onChange={(date) => {
            setValue(date);
            args.onChange(date);
          }}
        />
      </div>
    );
  },
  args: {
    placeholder: 'Кликни и выбери дату',
  },
};

export const WithValue: Story = {
  args: {
    value: new Date(2026, 5, 26),
  },
};

export const WithError: Story = {
  args: {
    value: new Date(19000, 0, 1),
    minDate: new Date(1940, 0, 1),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Календарь недоступен',
  },
};

export const DateConstraints: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <div style={{ width: '300px' }}>
        <DatePicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    placeholder: 'Доступна только текущая неделя',

    minDate: new Date(2026, 5, 22),
    maxDate: new Date(2026, 5, 28),
  },
};
