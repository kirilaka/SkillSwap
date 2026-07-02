import { render } from '@testing-library/react';
import { GalleryAddIcon } from './GalleryAddIcon';
import { describe, test, expect } from 'vitest';
import { vi } from 'vitest';

vi.mock('./GalleryAddIcon.svg?react', () => ({
  default: () => <svg data-testid="GalleryAddIcon-icon" />,
}));

describe('GalleryAddIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<GalleryAddIcon />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<GalleryAddIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
