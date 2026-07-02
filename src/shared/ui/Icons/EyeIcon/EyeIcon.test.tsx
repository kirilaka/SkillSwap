import { render } from '@testing-library/react';
import { EyeIcon } from './EyeIcon';
import { describe, test, expect } from 'vitest';
describe('EyeIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<EyeIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<EyeIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
