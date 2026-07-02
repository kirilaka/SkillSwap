import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { CountIcon } from './CountIcon';
import { describe, test, expect } from 'vitest';

describe('CountIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<CountIcon />);

    expect(container.querySelectorAll('button')).toHaveLength(2);
  });

  test('Корректное добавление className', () => {
    const { container } = render(<CountIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });

  test('Вызывает onClickLeft', () => {
    const handleClick = vi.fn();

    const { container } = render(<CountIcon onClickLeft={handleClick} />);

    fireEvent.click(container.querySelectorAll('button')[0]);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('Вызывает onClickRight', () => {
    const handleClick = vi.fn();

    const { container } = render(<CountIcon onClickRight={handleClick} />);

    fireEvent.click(container.querySelectorAll('button')[1]);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
