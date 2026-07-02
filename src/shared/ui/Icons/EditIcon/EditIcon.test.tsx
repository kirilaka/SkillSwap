import { render } from '@testing-library/react';
import { EditIcon } from './EditIcon';
import { describe, test, expect } from 'vitest';
describe('EditIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<EditIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<EditIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
