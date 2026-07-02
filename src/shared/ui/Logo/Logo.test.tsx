import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Logo } from './Logo';
import { MemoryRouter } from 'react-router-dom';

describe('Logo', () => {
  test('Рендер компонента', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('На главную страницу SkillSwap')).toBeInTheDocument();
  });

  test('Отображение логотипа и названия проекта', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    expect(screen.getByAltText('Логотип SkillSwap')).toBeInTheDocument();
    expect(screen.getByText('SkillSwap')).toBeInTheDocument();
  });

  test('Ссылка ведет на главную страницу', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('На главную страницу SkillSwap')).toHaveAttribute('href', '/');
  });

  test('Корректно принимает className', () => {
    render(
      <MemoryRouter>
        <Logo className="test" />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText('На главную страницу SkillSwap')).toHaveClass('test');
  });
});
