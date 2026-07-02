import { render } from '@testing-library/react';
import { PlusCircleIcon } from './PlusCircleIcon';
import { describe, test, expect } from 'vitest';
describe('PlusCircleIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<PlusCircleIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<PlusCircleIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
