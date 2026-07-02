import { render } from '@testing-library/react';
import { LikeIcon } from './LikeIcon';
import { describe, test, expect } from 'vitest';
import { vi } from 'vitest';

vi.mock('./LikeIcon.svg?react', () => ({
  default: () => <svg data-testid="LikeIcon-icon" />,
}));
describe('LikeIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<LikeIcon />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<LikeIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
