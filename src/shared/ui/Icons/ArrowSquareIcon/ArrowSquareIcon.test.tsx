import { render } from '@testing-library/react';
import { ArrowSquareIcon } from './ArrowSquareIcon';
import styles from './ArrowSquareIcon.module.scss';
import { describe, test, expect } from 'vitest';
describe('ArrowSquareIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<ArrowSquareIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добаление className', () => {
    const { container } = render(<ArrowSquareIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });

  test('Пропс derection навешивает класс', () => {
    const { container } = render(<ArrowSquareIcon direction="Right" />);
    expect(container.firstChild).toHaveClass(styles.directionRight);
  });
});
