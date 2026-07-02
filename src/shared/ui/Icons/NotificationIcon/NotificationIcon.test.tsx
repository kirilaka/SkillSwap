import { render } from '@testing-library/react';
import { NotificationIcon } from './NotificationIcon';
import styles from './NotificationIcon.module.scss';
import { describe, test, expect } from 'vitest';

describe('NotificationIcon', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<NotificationIcon />);

    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Корректное добавление className', () => {
    const { container } = render(<NotificationIcon className="test-class" />);

    expect(container.firstChild).toHaveClass('test-class');
  });

  test('Отображает индикатор новых уведомлений', () => {
    const { container } = render(<NotificationIcon hasNew />);

    expect(container.querySelector(`.${styles.dot}`)).toBeInTheDocument();
  });
});
