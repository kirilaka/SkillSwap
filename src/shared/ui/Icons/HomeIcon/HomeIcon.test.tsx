import { render } from '@testing-library/react';
import { HomeIcon } from './HomeIcon';
import { describe, test, expect } from 'vitest';
describe('HomeIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<HomeIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<HomeIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
