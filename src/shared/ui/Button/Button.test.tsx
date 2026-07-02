// src/shared/ui/Button/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('рендерит переданный текст (children)', () => {
    render(<Button>Нажми меня</Button>);

    expect(screen.getByRole('button', { name: /нажми меня/i })).toBeInTheDocument();
  });

  it('рендерит React-ноды в children', () => {
    render(
      <Button>
        <span data-testid="icon">⭐</span>
        <span>Текст</span>
      </Button>,
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Текст')).toBeInTheDocument();
  });

  it('вызывает onClick при клике', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Клик</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClick, если disabled=true', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Неактивна
      </Button>,
    );

    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('применяет type="button" по умолчанию', () => {
    render(<Button>По умолчанию</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('применяет type="submit"', () => {
    render(<Button type="submit">Отправить</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('применяет type="reset"', () => {
    render(<Button type="reset">Сбросить</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  it('применяет вариант buttonType="primary"', () => {
    const { container } = render(<Button buttonType="primary">Primary</Button>);
    const className = (container.firstChild as HTMLElement).className;

    expect(className).toMatch(/primary/);
  });

  it('применяет вариант buttonType="secondary" по умолчанию', () => {
    const { container } = render(<Button>Secondary</Button>);
    const className = (container.firstChild as HTMLElement).className;

    expect(className).toMatch(/secondary/);
  });

  it('применяет вариант buttonType="tertiary"', () => {
    const { container } = render(<Button buttonType="tertiary">Tertiary</Button>);
    const className = (container.firstChild as HTMLElement).className;

    expect(className).toMatch(/tertiary/);
  });

  it('принимает и применяет className', () => {
    const { container } = render(<Button className="my-custom-class">С классом</Button>);

    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('пробрасывает ref на button', () => {
    const ref = { current: null as HTMLButtonElement | null };

    render(<Button ref={ref}>С ref</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('пробрасывает data-атрибуты и другие HTML-пропсы', () => {
    render(
      <Button data-testid="custom-btn" aria-label="Закрыть">
        Закрыть
      </Button>,
    );

    expect(screen.getByTestId('custom-btn')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Закрыть');
  });
});
