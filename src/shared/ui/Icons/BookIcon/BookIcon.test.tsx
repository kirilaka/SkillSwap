import { render } from '@testing-library/react';
import { BookIcon } from './BookIcon';
import { describe, test, expect } from 'vitest';
describe('BookIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<BookIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<BookIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
