import { render } from '@testing-library/react';
import { GlobalIcon } from './GlobalIcon';
import { describe, test, expect } from 'vitest';
describe('GlobalIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<GlobalIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<GlobalIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
