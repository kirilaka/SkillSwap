import { render } from '@testing-library/react';
import { ScrollSquareIcon } from './ScrollSquareIcon';
import { describe, test, expect } from 'vitest';
describe('ScrollSquareIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<ScrollSquareIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<ScrollSquareIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
