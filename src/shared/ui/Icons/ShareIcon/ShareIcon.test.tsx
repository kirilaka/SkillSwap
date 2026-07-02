import { render } from '@testing-library/react';
import { ShareIcon } from './ShareIcon';
import { describe, test, expect } from 'vitest';
describe('ShareIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<ShareIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<ShareIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
