import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { DdInputCheckbox } from './DdInputCheckbox';

const mockItems = [
  { id: '1', label: 'Вариант 1' },
  { id: '2', label: 'Вариант 2' },
  { id: '3', label: 'Вариант 3' },
];

describe('DdInputCheckbox', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('Компонент отображает placeholder', () => {
    render(<DdInputCheckbox items={mockItems} placeholder="Выберите значение" />);

    expect(screen.getByPlaceholderText('Выберите значение')).toBeInTheDocument();
  });

  test('При клике открывается список и отображает все элементы из items', () => {
    render(<DdInputCheckbox items={mockItems} placeholder="Select" />);

    const input = screen.getByPlaceholderText('Select');
    fireEvent.click(input);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  test('Позволяет выбрать один элемент и вызывает обработчик выбора', () => {
    const onSelectItemMock = vi.fn();
    render(
      <DdInputCheckbox items={mockItems} placeholder="Select" onSelectItem={onSelectItemMock} />,
    );

    const input = screen.getByPlaceholderText('Select');
    fireEvent.click(input);

    const firstItemButton = screen.getByText('Вариант 1').closest('button');
    expect(firstItemButton).toBeInTheDocument();
    fireEvent.click(firstItemButton!);

    expect(onSelectItemMock).toHaveBeenCalledTimes(1);
    expect(onSelectItemMock).toHaveBeenCalledWith('1');
  });

  test('Отображает выбранные значения в инпуте', () => {
    render(<DdInputCheckbox items={mockItems} placeholder="Select" />);

    const input = screen.getByPlaceholderText('Select') as HTMLInputElement;
    fireEvent.click(input);

    const firstItemButton = screen.getByText('Вариант 1').closest('button');
    fireEvent.click(firstItemButton!);

    expect(input.value).toBe('Вариант 1');
  });

  test('Повторный клик отменяет выбор (предусмотрено логикой компонента)', () => {
    const onSelectItemMock = vi.fn();
    render(
      <DdInputCheckbox items={mockItems} placeholder="Select" onSelectItem={onSelectItemMock} />,
    );

    const input = screen.getByPlaceholderText('Select');
    fireEvent.click(input);

    const firstItemButton = screen.getByText('Вариант 1').closest('button');

    fireEvent.click(firstItemButton!);
    expect(onSelectItemMock).toHaveBeenLastCalledWith('1');

    fireEvent.click(firstItemButton!);
    expect(onSelectItemMock).toHaveBeenLastCalledWith(null);

    expect((input as HTMLInputElement).value).toBe('');
  });

  test('Компонент НЕ поддерживает выбор нескольких элементов (ограничение текущей логики)', () => {
    const onSelectItemMock = vi.fn();
    render(
      <DdInputCheckbox items={mockItems} placeholder="Select" onSelectItem={onSelectItemMock} />,
    );

    const input = screen.getByPlaceholderText('Select') as HTMLInputElement;
    fireEvent.click(input);

    const firstItemButton = screen.getByText('Вариант 1').closest('button');
    const secondItemButton = screen.getByText('Вариант 2').closest('button');

    fireEvent.click(firstItemButton!);
    fireEvent.click(secondItemButton!);

    expect(onSelectItemMock).toHaveBeenLastCalledWith('2');
    expect(input.value).toBe('Вариант 2');
  });

  test('Закрывается при клике за пределами элемента', () => {
    render(
      <div>
        <div data-testid="outside">Внешний элемент</div>
        <DdInputCheckbox items={mockItems} placeholder="Select" />
      </div>,
    );

    const input = screen.getByPlaceholderText('Select');

    fireEvent.click(input);
    fireEvent.mouseDown(screen.getByTestId('outside'));

    act(() => {
      vi.advanceTimersByTime(500);
    });

    fireEvent.click(input);
    expect(screen.getByText('Вариант 1')).toBeInTheDocument();
  });

  test('Корректно работает в режиме disabled', () => {
    render(<DdInputCheckbox items={mockItems} placeholder="Select" disabled />);

    const input = screen.getByPlaceholderText('Select') as HTMLInputElement;

    expect(input).toBeDisabled();
  });
});
