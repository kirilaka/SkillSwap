import { render } from '@testing-library/react';
import { SearchIcon } from './SearchIcon';
import { describe, test, expect } from 'vitest';
import { vi } from 'vitest';

vi.mock('./SearchIcon.svg?react', () => ({
  default: () => <svg data-testid="SearchIcon-icon" />,
}));
describe('SearchIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<SearchIcon />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<SearchIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
