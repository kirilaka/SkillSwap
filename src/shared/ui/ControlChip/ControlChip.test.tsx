import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ControlChip } from './ControlChip';

describe('ControlChip', () => {
  it('рендерит label', () => {
    render(<ControlChip label="Москва" />);

    expect(screen.getByText('Москва')).toBeInTheDocument();
  });

  it('вызывает onClick при клике', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<ControlChip label="Кликни меня" onClick={handleClick} />);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('отображает active-состояние через isActive', () => {
    const { container } = render(<ControlChip label="Активный" isActive={true} />);

    expect(container.firstChild).toHaveClass(/active/);
  });

  it('не отображает active-состояние по умолчанию', () => {
    const { container } = render(<ControlChip label="Неактивный" />);

    const className = (container.firstChild as HTMLElement).className;
    expect(className).not.toMatch(/active/);
  });

  it('принимает и применяет className', () => {
    const { container } = render(<ControlChip label="С классом" className="my-custom-class" />);

    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('рендерит ChevronIcon при iconVariant="Chevron"', () => {
    const { container } = render(<ControlChip label="С галочкой" iconVariant="Chevron" />);

    expect(container.querySelector('img[src*="Chevron"]')).toBeInTheDocument();
  });

  it('рендерит CrossIcon при iconVariant="Cross"', () => {
    const { container } = render(<ControlChip label="С крестиком" iconVariant="Cross" />);

    expect(container.querySelector('img[src*="Cross"]')).toBeInTheDocument();
  });

  it('не рендерит иконку при iconVariant="" по умолчанию', () => {
    const { container } = render(<ControlChip label="Без иконки" />);

    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('передает isOpen в ChevronIcon', () => {
    const { container } = render(
      <ControlChip label="Открыт" iconVariant="Chevron" isOpen={true} />,
    );

    const chevronImg = container.querySelector('img[src*="Chevron"]');
    expect(chevronImg).toBeInTheDocument();
  });

  it('корректно применяет type="button"', () => {
    render(<ControlChip label="Кнопка" />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
