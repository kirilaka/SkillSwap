import { render } from '@testing-library/react';
import { BriefcaseIcon } from './BriefcaseIcon';
import { describe, test, expect } from 'vitest';
describe('BriefcaseIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<BriefcaseIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<BriefcaseIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
