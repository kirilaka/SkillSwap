import { render } from '@testing-library/react';
import { PaletteIcon } from './PaletteIcon';
import { describe, test, expect } from 'vitest';
describe('PaletteIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<PaletteIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<PaletteIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
