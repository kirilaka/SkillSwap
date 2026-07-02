import { render } from '@testing-library/react';
import { GalleryEditIcon } from './GalleryEditIcon';
import { describe, test, expect } from 'vitest';
describe('GalleryEditIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<GalleryEditIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<GalleryEditIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
