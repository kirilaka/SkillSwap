import { render } from '@testing-library/react';
import { ScrollIcon } from './ScrollIcon';
import { describe, test, expect } from 'vitest';
describe('ScrollIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<ScrollIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<ScrollIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
