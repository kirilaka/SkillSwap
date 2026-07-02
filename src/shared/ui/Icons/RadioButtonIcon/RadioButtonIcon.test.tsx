import { render } from '@testing-library/react';
import { RadioButtonIcon } from './RadioButtonIcon';
import { describe, test, expect } from 'vitest';
describe('RadioButtonIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<RadioButtonIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<RadioButtonIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
