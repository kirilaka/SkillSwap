import { render } from '@testing-library/react';
import { MessageTextIcon } from './MessageTextIcon';
import { describe, test, expect } from 'vitest';
describe('MessageTextIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<MessageTextIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<MessageTextIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
