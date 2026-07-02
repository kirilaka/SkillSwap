import { render } from '@testing-library/react';
import { CrossIcon } from './CrossIcon';
import { describe, test, expect } from 'vitest';
describe('CrossIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<CrossIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<CrossIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
