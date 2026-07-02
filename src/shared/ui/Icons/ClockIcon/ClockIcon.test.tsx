import { render } from '@testing-library/react';
import { ClockIcon } from './ClockIcon';
import { describe, test, expect } from 'vitest';
describe('ClockIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<ClockIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<ClockIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
