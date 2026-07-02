import { render } from '@testing-library/react';
import { UserIcon } from './UserIcon';
import { describe, test, expect } from 'vitest';
describe('UserIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<UserIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<UserIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
