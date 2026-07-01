// src/shared/ui/Input/Input.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('компонент рендерится', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('отображает переданный value', () => {
    render(<Input value="test value" onChange={() => {}} />);

    expect(screen.getByRole('textbox')).toHaveValue('test value');
  });

  it('отображает placeholder', () => {
    render(<Input placeholder="Введите текст" />);

    expect(screen.getByPlaceholderText('Введите текст')).toBeInTheDocument();
  });

  it('вызывает onChange при вводе текста', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} />);

    await user.type(screen.getByRole('textbox'), 'abc');

    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'abc' }),
      }),
    );
  });

  it('поддерживает type="text"', () => {
    render(<Input type="text" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('поддерживает type="email"', () => {
    render(<Input type="email" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('поддерживает type="password"', () => {
    render(<Input type="password" />);

    // password-инпут не имеет роль textbox, ищем по селектору
    expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
  });

  it('поле недоступно для ввода при disabled', () => {
    render(<Input disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('не вызывает onChange при вводе, если disabled', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} disabled />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'abc');

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('отображает иконку, если передана', () => {
    render(<Input icon={<span data-testid="search-icon">🔍</span>} />);

    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('иконка отображается слева при iconPosition="left"', () => {
    const { container } = render(
      <Input icon={<span data-testid="icon">🔍</span>} iconPosition="left" />,
    );

    const input = container.querySelector('input');
    expect(input?.className).toMatch(/WithIconLeft/);
  });

  it('иконка отображается справа при iconPosition="right"', () => {
    const { container } = render(
      <Input icon={<span data-testid="icon">🔍</span>} iconPosition="right" />,
    );

    const input = container.querySelector('input');
    expect(input?.className).toMatch(/WithIconRight/);
  });

  it('иконка не добавляет отступы при iconPosition="none"', () => {
    const { container } = render(
      <Input icon={<span data-testid="icon">🔍</span>} iconPosition="none" />,
    );

    const input = container.querySelector('input');
    expect(input?.className).not.toMatch(/WithIconLeft/);
    expect(input?.className).not.toMatch(/WithIconRight/);
  });

  it('принимает и применяет className', () => {
    render(<Input className="my-custom-class" />);

    const wrapperDiv = screen.getByRole('textbox').parentElement;

    expect(wrapperDiv?.className).toMatch(/my-custom-class/);
  });

  it('прокидывает ref на input', () => {
    const ref = { current: null as HTMLInputElement | null };

    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('показывает ошибку валидации при blur, если showErrorOn="blur"', async () => {
    const user = userEvent.setup();

    render(<Input required showErrorOn="blur" />);

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.tab();

    expect(screen.getByText('Это поле обязательно для заполнения')).toBeInTheDocument();
  });

  it('показывает ошибку валидации при вводе, если showErrorOn="change"', async () => {
    const user = userEvent.setup();

    render(<Input minLength={5} showErrorOn="change" />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'ab');

    expect(screen.getByText('Минимальная длина: 5 символов')).toBeInTheDocument();
  });

  it('санитизирует HTML-теги при вводе', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, '<script>alert(1)</script>');

    expect(input).toHaveValue('alert(1)');
  });

  it('пробрасывает data-атрибуты и другие HTML-пропсы', () => {
    render(<Input data-testid="custom-input" aria-label="Поиск" />);

    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Поиск');
  });
});
