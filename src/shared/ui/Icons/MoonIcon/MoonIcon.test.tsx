import { render } from '@testing-library/react';
import { MoonIcon } from './MoonIcon';
import { describe, test, expect } from 'vitest';
import { vi } from 'vitest';

vi.mock('./MoonIcon.svg?react', () => ({
  default: () => <svg data-testid="MoonIcon-icon" />,
}));
describe('MoonIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<MoonIcon />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<MoonIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
