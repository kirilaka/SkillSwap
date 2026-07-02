import { render } from '@testing-library/react';
import { UserCircleIcon } from './UserCircleIcon';
import { describe, test, expect } from 'vitest';
describe('UserCircleIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<UserCircleIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<UserCircleIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
