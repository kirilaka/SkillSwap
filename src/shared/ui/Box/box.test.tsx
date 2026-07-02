import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('рендерит children (текст)', () => {
    render(<Box>Тестовый контент</Box>);

    expect(screen.getByText('Тестовый контент')).toBeInTheDocument();
  });

  it('рендерит children (React-элементы)', () => {
    render(
      <Box>
        <h1 data-testid="box-title">Заголовок</h1>
        <p>Текст</p>
      </Box>,
    );

    expect(screen.getByTestId('box-title')).toBeInTheDocument();
    expect(screen.getByText('Текст')).toBeInTheDocument();
  });

  it('не рендерит ничего, если children отсутствуют', () => {
    const { container } = render(<Box>{null}</Box>);

    expect(container.firstChild).toBeNull();
  });

  it('принимает и применяет className', () => {
    const { container } = render(<Box className="my-custom-class">Контент</Box>);

    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('применяет базовый класс box из CSS Modules', () => {
    const { container } = render(<Box>Контент</Box>);

    const className = (container.firstChild as HTMLElement).className;
    expect(className).toMatch(/box/);
  });

  it('не ломает вложенный контент с интерактивными элементами', async () => {
    render(
      <Box>
        <button>Кнопка внутри Box</button>
      </Box>,
    );

    expect(screen.getByRole('button', { name: 'Кнопка внутри Box' })).toBeInTheDocument();
  });

  it('рендерит div-контейнер', () => {
    const { container } = render(<Box>Контент</Box>);

    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('прокидывает HTML-атрибуты в div', () => {
    render(
      <Box data-testid="box" data-state="open" id="main-box">
        Контент
      </Box>,
    );

    const box = screen.getByTestId('box');

    expect(box).toHaveAttribute('data-state', 'open');
    expect(box).toHaveAttribute('id', 'main-box');
  });
});
