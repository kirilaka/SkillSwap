import { render } from '@testing-library/react';
import { SortIcon } from './SortIcon';
import { describe, test, expect } from 'vitest';
describe('SortIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<SortIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<SortIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
