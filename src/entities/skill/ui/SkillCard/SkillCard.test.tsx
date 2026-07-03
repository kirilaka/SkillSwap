import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Skill } from '@/shared/types';
import { SkillCard } from './SkillCard';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProvider';

// Mock icons
vi.mock('@/shared/ui/Icons/ShareIcon/ShareIcon', () => ({
  ShareIcon: () => <svg data-testid="mock-share-icon" />,
}));
vi.mock('@/shared/ui/Icons/MoreCircleIcon/MoreCircleIcon', () => ({
  MoreCircleIcon: () => <svg data-testid="mock-more-circle-icon" />,
}));
vi.mock('@/shared/ui/Icons/EditIcon/EditIcon', () => ({
  EditIcon: () => <svg data-testid="mock-edit-icon" />,
}));
vi.mock('@/features/favorite/ui/FavoriteButton/FavoriteButton', () => ({
  FavoriteButton: ({
    isFavorite,
    onClick,
    disabled,
  }: {
    isFavorite?: boolean;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      data-testid="mock-favorite-button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      aria-pressed={isFavorite}
    />
  ),
}));

const mockSkill: Skill = {
  id: '1',
  title: 'Уроки игры на барабанах',
  description: 'Научу вас играть на барабанах с нуля. Разберем базовые ритмы.',
  type: 'teach',
  category: 'art',
  categoryId: '',
  subcategory: '',
  subcategoryId: '',
  tags: ['музыка', 'барабаны'],
  imageUrl: null,
  authorId: '123',
  createdAt: '2023-10-27',
};

describe('SkillCard', () => {
  it('рендерит skill title/description', () => {
    render(<SkillCard skill={mockSkill} />);

    expect(screen.getByText('Уроки игры на барабанах')).toBeInTheDocument();
    expect(
      screen.getByText('Научу вас играть на барабанах с нуля. Разберем базовые ритмы.'),
    ).toBeInTheDocument();
  });

  it('не падает без imageUrl', () => {
    const skillWithoutImage = { ...mockSkill, imageUrl: null };

    expect(() => {
      render(<SkillCard skill={skillWithoutImage} />);
    }).not.toThrow();

    expect(screen.getByText('Уроки игры на барабанах')).toBeInTheDocument();
  });

  it('offer режим показывает "Предложить обмен"', () => {
    render(<SkillCard skill={mockSkill} cardVariant="offer" />);

    expect(screen.getByRole('button', { name: /предложить обмен/i })).toBeInTheDocument();
  });

  it('editable режим показывает действия редактирования', () => {
    render(<SkillCard skill={mockSkill} cardVariant="editable" canDelete={true} />);

    expect(screen.getByRole('button', { name: /удалить/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /редактировать/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /сохранить/i })).toBeInTheDocument();
  });

  it('кнопка удаления отображается при canDelete', () => {
    render(<SkillCard skill={mockSkill} cardVariant="editable" canDelete={true} />);

    expect(screen.getByRole('button', { name: /удалить/i })).toBeInTheDocument();
  });

  it('кнопка удаления не отображается, если canDelete=false', () => {
    render(<SkillCard skill={mockSkill} cardVariant="editable" canDelete={false} />);

    expect(screen.queryByRole('button', { name: /удалить/i })).not.toBeInTheDocument();
  });

  it('обработчик onSendOfferButtonClick вызывается при клике', async () => {
    const handleSendOffer = vi.fn();
    const user = userEvent.setup();
    render(
      <SkillCard skill={mockSkill} cardVariant="offer" onSendOfferButtonClick={handleSendOffer} />,
    );

    await user.click(screen.getByRole('button', { name: /предложить обмен/i }));

    expect(handleSendOffer).toHaveBeenCalledTimes(1);
  });

  it('обработчик onDeleteButtonClick вызывается при клике', async () => {
    const handleDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <SkillCard
        skill={mockSkill}
        cardVariant="editable"
        canDelete={true}
        onDeleteButtonClick={handleDelete}
      />,
    );

    await user.click(screen.getByRole('button', { name: /удалить/i }));

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('обработчик onEditButtonClick вызывается при клике', async () => {
    const handleEdit = vi.fn();
    const user = userEvent.setup();
    render(<SkillCard skill={mockSkill} cardVariant="editable" onEditButtonClick={handleEdit} />);

    await user.click(screen.getByRole('button', { name: /редактировать/i }));

    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it('обработчик onConfirmEditButtonClick вызывается при клике', async () => {
    const handleConfirm = vi.fn();
    const user = userEvent.setup();
    render(
      <SkillCard
        skill={mockSkill}
        cardVariant="editable"
        onConfirmEditButtonClick={handleConfirm}
      />,
    );

    await user.click(screen.getByRole('button', { name: /сохранить/i }));

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('loading=true блокирует действия', async () => {
    const handleSendOffer = vi.fn();
    const user = userEvent.setup();
    render(
      <SkillCard
        skill={mockSkill}
        cardVariant="offer"
        isLoading={true}
        onSendOfferButtonClick={handleSendOffer}
      />,
    );

    const button = screen.getByRole('button', { name: /предложить обмен/i });

    expect(button).toBeDisabled();
    await user.click(button);

    expect(handleSendOffer).not.toHaveBeenCalled();
  });

  it('disabled блокирует действия (если не передан обработчик)', () => {
    render(<SkillCard skill={mockSkill} cardVariant="offer" />);

    const button = screen.getByRole('button', { name: /предложить обмен/i });

    expect(button).toBeDisabled();
  });

  it('SkillCard не требует Redux', () => {
    expect(() => {
      render(<SkillCard skill={mockSkill} />);
    }).not.toThrow();
  });

  it('работает внутри renderWithProviders', () => {
    renderWithProviders(<SkillCard skill={mockSkill} />);

    expect(screen.getByText('Уроки игры на барабанах')).toBeInTheDocument();
  });
});
