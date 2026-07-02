import { render } from '@testing-library/react';
import { IdeaIcon } from './IdeaIcon';
import { describe, test, expect } from 'vitest';
describe('IdeaIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<IdeaIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<IdeaIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
