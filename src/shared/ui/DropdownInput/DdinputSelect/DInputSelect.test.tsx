import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DdInputSelect } from './DdInputSelect';

const mockItems = [
  { id: '1', label: 'Москва' },
  { id: '2', label: 'Санкт-Петербург' },
  { id: '3', label: 'Казань' },
];

describe('DdInputSelect', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('рендерит placeholder', () => {
    render(<DdInputSelect items={mockItems} placeholder="Выберите город" />);

    expect(screen.getByPlaceholderText('Выберите город')).toBeInTheDocument();
  });

  it('при клике открывается список', async () => {
    const user = userEvent.setup();

    render(<DdInputSelect items={mockItems} placeholder="Выберите город" />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    expect(screen.getByText('Москва')).toBeInTheDocument();
    expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
    expect(screen.getByText('Казань')).toBeInTheDocument();
  });

  it('в списке отображаются переданные items', async () => {
    const user = userEvent.setup();

    render(<DdInputSelect items={mockItems} placeholder="Выберите город" />);

    await user.click(screen.getByRole('textbox'));

    mockItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('при клике по элементу вызывается обработчик выбора', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <DdInputSelect items={mockItems} placeholder="Выберите город" onSelectItem={handleSelect} />,
    );

    await user.click(screen.getByRole('textbox'));
    await user.click(screen.getByText('Москва'));

    expect(handleSelect).toHaveBeenCalledWith('1');
  });

  it('после выбора отображается выбранное значение', async () => {
    const user = userEvent.setup();

    render(<DdInputSelect items={mockItems} placeholder="Выберите город" />);

    await user.click(screen.getByRole('textbox'));
    await user.click(screen.getByText('Москва'));

    expect(screen.getByRole('textbox')).toHaveValue('Москва');
  });

  it('после выбора dropdown закрывается', async () => {
    const user = userEvent.setup();

    render(<DdInputSelect items={mockItems} placeholder="Выберите город" />);

    await user.click(screen.getByRole('textbox'));
    expect(screen.getByText('Казань')).toBeInTheDocument();

    await user.click(screen.getByText('Москва'));

    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.queryByText('Казань')).not.toBeInTheDocument();
    });
  });

  it('закрывается при клике вне dropdown', async () => {
    const user = userEvent.setup();

    render(
      <>
        <DdInputSelect items={mockItems} placeholder="Выберите город" />
        <button type="button">Вне компонента</button>
      </>,
    );

    await user.click(screen.getByRole('textbox'));

    expect(screen.getByTestId('dd-input-select-box')).toHaveAttribute('data-state', 'open');

    await user.click(screen.getByRole('button', { name: 'Вне компонента' }));

    await waitFor(() => {
      expect(screen.getByTestId('dd-input-select-box')).toHaveAttribute('data-state', 'closed');
    });
  });

  it('закрывается по Escape', async () => {
    const user = userEvent.setup();

    render(<DdInputSelect items={mockItems} placeholder="Выберите город" />);

    const input = screen.getByRole('textbox');

    await user.click(input);

    expect(screen.getByTestId('dd-input-select-box')).toHaveAttribute('data-state', 'open');

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.getByTestId('dd-input-select-box')).toHaveAttribute('data-state', 'closed');
    });
  });

  it('если передан disabled, input недоступен', () => {
    render(<DdInputSelect items={mockItems} placeholder="Выберите город" disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('корректно принимает className', () => {
    const { container } = render(
      <DdInputSelect items={mockItems} placeholder="Выберите город" className="my-custom-class" />,
    );

    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('фильтрует items при вводе текста', async () => {
    const user = userEvent.setup();

    render(<DdInputSelect items={mockItems} placeholder="Выберите город" />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Мос');

    expect(screen.getByText('Москва')).toBeInTheDocument();
    expect(screen.queryByText('Казань')).not.toBeInTheDocument();
  });

  it('очищает выбор при клике на крестик', async () => {
    const user = userEvent.setup();

    render(<DdInputSelect items={mockItems} placeholder="Выберите город" />);

    await user.click(screen.getByRole('textbox'));
    await user.click(screen.getByText('Москва'));

    expect(screen.getByRole('textbox')).toHaveValue('Москва');

    await user.click(screen.getByRole('textbox'));

    const buttons = screen.getAllByRole('button');
    const clearButton = buttons.find((btn) => !btn.textContent?.trim());

    expect(clearButton).toBeDefined();
    if (clearButton) {
      await user.click(clearButton);
    }

    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
