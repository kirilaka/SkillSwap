import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker } from './DatePicker';

// Мокаем иконки, чтобы избежать ошибок парсинга SVG
vi.mock('@/shared/ui/Icons/CalendarIcon/CalendarIcon', () => ({
  CalendarIcon: () => <span data-testid="calendar-icon" />,
}));
vi.mock('@/shared/ui/Icons/ChevronIcon/ChevronIcon', () => ({
  ChevronIcon: () => <span data-testid="chevron-icon" />,
}));

describe('DatePicker Component', () => {
  const defaultProps = {
    onChange: vi.fn(),
    placeholder: 'Выберите дату',
  };

  it('отображает заполнитель, если дата не выбрана', () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByPlaceholderText('Выберите дату');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('открывает календарь при клике на инпут', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} />);

    const input = screen.getByPlaceholderText('Выберите дату');
    await user.click(input);

    expect(screen.getByText('Отменить')).toBeInTheDocument();
    expect(screen.getByText('Выбрать')).toBeInTheDocument();
  });

  it('закрывает календарь при повторном клике', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} />);

    const input = screen.getByPlaceholderText('Выберите дату');
    await user.click(input); // Открыли
    expect(screen.queryByText('Выбрать')).toBeInTheDocument();

    await user.click(input); // Закрыли
    expect(screen.queryByText('Выбрать')).not.toBeInTheDocument();
  });

  it('не вызывает onChange сразу при выборе дня (требуется подтверждение)', async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(<DatePicker {...defaultProps} value={new Date(2026, 6, 15)} onChange={onChangeMock} />);

    await user.click(screen.getByRole('textbox'));

    const dayButton = screen.getByRole('button', { name: /20 июля/i });
    await user.click(dayButton);

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('вызывает onChange и форматирует дату после клика на кнопку «Выбрать»', async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(<DatePicker {...defaultProps} value={new Date(2026, 6, 15)} onChange={onChangeMock} />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    const dayButton = screen.getByRole('button', { name: /20 июля/i });
    await user.click(dayButton);

    const confirmButton = screen.getByRole('button', { name: 'Выбрать' });
    await user.click(confirmButton);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(new Date(2026, 6, 20));
    expect(input).toHaveValue('20.07.2026');
  });

  it('закрывает календарь без вызова onChange при клике на «Отменить»', async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(<DatePicker {...defaultProps} value={new Date(2026, 6, 15)} onChange={onChangeMock} />);

    await user.click(screen.getByRole('textbox'));

    const dayButton = screen.getByRole('button', { name: /20 июля/i });
    await user.click(dayButton);

    const cancelButton = screen.getByRole('button', { name: 'Отменить' });
    await user.click(cancelButton);

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(screen.queryByText('Выбрать')).not.toBeInTheDocument();
  });

  it('закрывает календарь при клике за пределами компонента', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <div data-testid="outside">Внешняя область</div>
        <DatePicker {...defaultProps} />
      </div>,
    );

    await user.click(screen.getByRole('textbox'));
    expect(screen.getByText('Выбрать')).toBeInTheDocument();

    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByText('Выбрать')).not.toBeInTheDocument();
  });

  it('закрывает календарь при нажатии клавиши Escape', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} />);

    await user.click(screen.getByRole('textbox'));
    expect(screen.getByText('Выбрать')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByText('Выбрать')).not.toBeInTheDocument();
  });

  it('не открывает календарь, если disabled=true', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} disabled={true} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    await user.click(input);
    expect(screen.queryByText('Выбрать')).not.toBeInTheDocument();
  });

  it('блокирует даты раньше minDate и позже maxDate', async () => {
    const user = userEvent.setup();
    const minDate = new Date(2026, 6, 10);
    const maxDate = new Date(2026, 6, 25);

    const { container } = render(
      <DatePicker
        {...defaultProps}
        value={new Date(2026, 6, 15)}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );

    await user.click(screen.getByRole('textbox'));

    // Находим конкретные кнопки внутри ячеек с уникальным атрибутом даты
    const earlyDayButton = container.querySelector('[data-day="2026-07-05"] button');
    expect(earlyDayButton).toBeDisabled();

    const lateDayButton = container.querySelector('[data-day="2026-07-29"] button');
    expect(lateDayButton).toBeDisabled();

    const validDayButton = container.querySelector('[data-day="2026-07-15"] button');
    expect(validDayButton).not.toBeDisabled();
  });

  it('отображает сообщение об ошибке валидации при некорректном ручном вводе', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} />);

    const input = screen.getByRole('textbox');

    await user.type(input, '99.99.9999');
    await user.click(document.body);

    await waitFor(() => {
      expect(screen.getByText('Введите дату в формате дд.мм.гггг')).toBeInTheDocument();
    });
  });
});
