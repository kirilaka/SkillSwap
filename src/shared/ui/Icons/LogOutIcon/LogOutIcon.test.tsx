import { render } from '@testing-library/react';
import { LogOutIcon } from './LogOutIcon';
import { describe, test, expect } from 'vitest';
describe('LogOutIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<LogOutIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<LogOutIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
