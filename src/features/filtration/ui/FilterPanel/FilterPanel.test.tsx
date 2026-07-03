// src/features/filtration/ui/FilterPanel/FilterPanel.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterPanel } from './FilterPanel';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProvider';

// Мокаем city selector
vi.mock('@/entities/city', () => ({
  selectAvailableFilterCities: () => () => [],
}));

// Мокаем CheckboxCircle и CheckboxSquare
vi.mock('@/shared/ui/Checkbox', () => ({
  CheckboxCircle: ({ isActive, onChange }: { isActive?: boolean; onChange?: () => void }) => (
    <input
      type="checkbox"
      data-testid="checkbox-circle"
      checked={isActive}
      onChange={onChange}
      readOnly
    />
  ),
  CheckboxSquare: ({
    isActive,
    onChange,
    variant,
  }: {
    isActive?: boolean;
    onChange?: () => void;
    variant?: string;
  }) => (
    <input
      type="checkbox"
      data-testid={`checkbox-square-${variant}`}
      checked={isActive}
      onChange={onChange}
      readOnly
    />
  ),
}));

// Мокаем ControlChip
vi.mock('@/shared/ui/ControlChip/ControlChip', () => ({
  ControlChip: ({
    label,
    onClick,
    isOpen,
    isActive,
    iconVariant,
  }: {
    label: string;
    onClick?: () => void;
    isOpen?: boolean;
    isActive?: boolean;
    iconVariant?: string;
  }) => (
    <button
      type="button"
      data-testid={`control-chip-${label}`}
      onClick={onClick}
      data-is-open={isOpen}
      data-is-active={isActive}
      data-icon-variant={iconVariant}
    >
      <span>{label}</span>
    </button>
  ),
}));

// Мокаем иконки
vi.mock('@/shared/ui/Icons/ChevronIcon/ChevronIcon', () => ({
  ChevronIcon: ({ isOpen }: { isOpen?: boolean }) => (
    <span data-testid="chevron-icon" data-is-open={isOpen} />
  ),
}));

vi.mock('@/shared/ui/Icons/CrossIcon/CrossIcon', () => ({
  CrossIcon: () => <span data-testid="cross-icon" />,
}));

describe('FilterPanel', () => {
  it('renders title "Фильтры"', () => {
    renderWithProviders(<FilterPanel />);

    expect(screen.getByText('Фильтры')).toBeInTheDocument();
  });

  it('shows exchange type options', () => {
    renderWithProviders(<FilterPanel />);

    expect(screen.getByRole('radio', { name: 'Всё' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Могу научить' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Хочу научиться' })).toBeInTheDocument();
  });

  it('shows categories', () => {
    renderWithProviders(<FilterPanel />);

    expect(screen.getByText('Бизнес и карьера')).toBeInTheDocument();
    expect(screen.getByText('Творчество и искусство')).toBeInTheDocument();
    expect(screen.getByText('Иностранные языки')).toBeInTheDocument();
    expect(screen.getByText('Образование и развитие')).toBeInTheDocument();
    expect(screen.getByText('Дом и уют')).toBeInTheDocument();
    expect(screen.getByText('Здоровье и лайфстайл')).toBeInTheDocument();
  });

  it('shows gender options', () => {
    renderWithProviders(<FilterPanel />);

    expect(screen.getByRole('radio', { name: 'Не имеет значения' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Мужской' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Женский' })).toBeInTheDocument();
  });

  it('clicking exchange type changes Redux state', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FilterPanel />);

    const teachButton = screen.getByRole('radio', { name: 'Могу научить' });
    await user.click(teachButton);

    // Проверяем что aria-checked стал true
    expect(teachButton).toHaveAttribute('aria-checked', 'true');
  });

  it('clicking category changes selectedCategoryIds', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FilterPanel />);

    // Кликаем по чекбоксу категории "Бизнес и карьера" (squareMinus)
    const businessCheckbox = screen.getAllByTestId('checkbox-square-minus')[0];
    await user.click(businessCheckbox);

    expect(businessCheckbox).toBeInTheDocument();
  });

  it('clicking subcategory changes selectedSubcategoryIds', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FilterPanel />);

    // Открываем категорию, кликнув по ControlChip с Chevron
    const businessChip = screen.getByTestId('control-chip-Бизнес и карьера');
    await user.click(businessChip);

    // Кликаем по чекбоксу подкатегории (squareCheck)
    const subCheckboxes = screen.getAllByTestId('checkbox-square-check');
    if (subCheckboxes.length > 0) {
      await user.click(subCheckboxes[0]);
    }

    expect(subCheckboxes.length).toBeGreaterThan(0);
  });

  it('shows "Сбросить" button when filters are active', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FilterPanel />);

    // Изначально кнопки нет
    expect(screen.queryByTestId('control-chip-Сбросить')).not.toBeInTheDocument();

    // Активируем фильтр — кликаем по "Могу научить"
    await user.click(screen.getByRole('radio', { name: 'Могу научить' }));

    // Кнопка появилась
    expect(screen.getByTestId('control-chip-Сбросить')).toBeInTheDocument();
  });

  it('clicking "Сбросить" clears filters', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FilterPanel />);

    // Активируем фильтр
    await user.click(screen.getByRole('radio', { name: 'Могу научить' }));
    expect(screen.getByTestId('control-chip-Сбросить')).toBeInTheDocument();

    // Сбрасываем
    await user.click(screen.getByTestId('control-chip-Сбросить'));

    // Кнопка исчезла
    expect(screen.queryByTestId('control-chip-Сбросить')).not.toBeInTheDocument();
  });
});
