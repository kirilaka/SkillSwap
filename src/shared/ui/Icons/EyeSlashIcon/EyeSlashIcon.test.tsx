import { render } from '@testing-library/react';
import { EyeSlashIcon } from './EyeSlashIcon';
import { describe, test, expect } from 'vitest';
describe('EyeSlashIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<EyeSlashIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<EyeSlashIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });
});
