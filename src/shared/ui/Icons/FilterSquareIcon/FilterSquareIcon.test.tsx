import { render } from '@testing-library/react';
import { FilterSquareIcon } from './FilterSquareIcon';
import { describe, test, expect } from 'vitest';
describe('FilterSquareIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<FilterSquareIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<FilterSquareIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
