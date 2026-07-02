import { render } from '@testing-library/react';
import { CheckboxRemoveIcon } from './CheckboxRemoveIcon';
import { describe, test, expect } from 'vitest';
describe('CheckboxRemoveIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<CheckboxRemoveIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<CheckboxRemoveIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
