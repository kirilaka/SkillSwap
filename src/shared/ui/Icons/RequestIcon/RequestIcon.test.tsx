import { render } from '@testing-library/react';
import { RequestIcon } from './RequestIcon';
import { describe, test, expect } from 'vitest';
describe('RequestIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<RequestIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<RequestIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
