import { render } from '@testing-library/react';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { describe, test, expect } from 'vitest';
describe('ArrowLeftIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<ArrowLeftIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<ArrowLeftIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
