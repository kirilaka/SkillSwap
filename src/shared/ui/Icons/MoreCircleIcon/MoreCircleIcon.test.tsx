import { render } from '@testing-library/react';
import { MoreCircleIcon } from './MoreCircleIcon';
import { describe, test, expect } from 'vitest';
describe('MoreCircleIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<MoreCircleIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<MoreCircleIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
