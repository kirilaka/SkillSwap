import { render } from '@testing-library/react';
import { CalendarIcon } from './CalendarIcon';
import { describe, test, expect } from 'vitest';
describe('CalendarIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<CalendarIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<CalendarIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
