import { render } from '@testing-library/react';
import { DoneIcon } from './DoneIcon';
import { describe, test, expect } from 'vitest';
describe('DoneIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<DoneIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<DoneIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
