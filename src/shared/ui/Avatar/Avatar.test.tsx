import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('рендерит изображение, если передан src', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Аватар пользователя" />);

    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('у изображения корректный alt', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Аватар пользователя" />);

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Аватар пользователя');
  });

  it('отображает fallback, если src не передан', () => {
    render(<Avatar alt="Аватар по умолчанию" />);

    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    // fallbackSvg импортирован как строка (путь к файлу)
    expect(img.getAttribute('src')).toMatch(/fallback/);
  });

  it('не падает при src=null', () => {
    expect(() => {
      render(<Avatar src={null as unknown as string} alt="Тест" />);
    }).not.toThrow();

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('принимает и применяет className', () => {
    const { container } = render(
      <Avatar src="https://example.com/avatar.jpg" className="my-custom-class" />,
    );

    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('отображает fallback с кастомным fallbackSrc', () => {
    render(<Avatar fallbackSrc="/custom-fallback.png" alt="Кастомный fallback" />);

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', '/custom-fallback.png');
  });

  it('приоритет отдаёт src перед fallbackSrc', () => {
    render(
      <Avatar src="https://example.com/avatar.jpg" fallbackSrc="/custom-fallback.png" alt="Тест" />,
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });
});
