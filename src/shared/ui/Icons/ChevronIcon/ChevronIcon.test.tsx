import { render } from '@testing-library/react';
import { ChevronIcon } from './ChevronIcon';
import { describe, test, expect } from 'vitest';
import styles from './ChevronIcon.module.scss';
describe('ChevronIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<ChevronIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<ChevronIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });

  test('Применяет открытое состояние', () => {
    const { container } = render(<ChevronIcon isOpen />);
    expect(container.firstChild).toHaveClass(styles.horizontalOpen);
  });
});
