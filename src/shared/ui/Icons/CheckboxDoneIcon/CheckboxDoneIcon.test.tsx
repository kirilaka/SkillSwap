import { render } from '@testing-library/react';
import { CheckboxDoneIcon } from './CheckboxDoneIcon';
import { describe, test, expect } from 'vitest';
describe('CheckboxDoneIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<CheckboxDoneIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<CheckboxDoneIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
