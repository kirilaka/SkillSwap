import { render } from '@testing-library/react';
import { CheckboxEmptyIcon } from './CheckboxEmptyIcon';
import { describe, test, expect } from 'vitest';
describe('CheckboxEmptyIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<CheckboxEmptyIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<CheckboxEmptyIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
