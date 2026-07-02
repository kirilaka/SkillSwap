import { FavoriteButton } from './FavoriteButton';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@/shared/ui/Icons/LikeIcon/LikeIcon', () => ({
  LikeIcon: () => <svg data-testid="like-icon" />,
}));

describe('Тест компонента FavoruteButton', () => {
  test('Компонент рендерится', () => {
    render(<FavoriteButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Компонент имеет тип button', () => {
    render(<FavoriteButton />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  test('Вызывает onClick при клике', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<FavoriteButton onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Компонент не вызывает onClick при disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<FavoriteButton onClick={onClick} disabled />);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  test('Компонент принимает className', () => {
    render(<FavoriteButton className="test" />);
    expect(screen.getByRole('button')).toHaveClass('test');
  });

  test('Отображает неактивную кнопку', () => {
    render(<FavoriteButton />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Добавить в избранное');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  test('Отображает активную кнопку', () => {
    render(<FavoriteButton isFavorite />);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', 'Удалить из избранного');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
});
