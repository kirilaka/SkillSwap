import { render } from '@testing-library/react';
import { SunIcon } from './SunIcon';
import { describe, test, expect } from 'vitest';
import { vi } from 'vitest';

vi.mock('./SunIcon.svg?react', () => ({
  default: () => <svg data-testid="SunIcon-icon" />,
}));
describe('SunIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<SunIcon />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<SunIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
