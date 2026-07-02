import { render } from '@testing-library/react';
import { AddIcon } from './AddIcon';
import { describe, test, expect } from 'vitest';
describe('AddIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<AddIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<AddIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
