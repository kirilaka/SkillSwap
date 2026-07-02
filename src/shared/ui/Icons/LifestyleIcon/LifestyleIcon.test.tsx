import { render } from '@testing-library/react';
import { LifestyleIcon } from './LifestyleIcon';
import { describe, test, expect } from 'vitest';
describe('LifestyleIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<LifestyleIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<LifestyleIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
