import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProvider';
import { AuthLayout } from './AuthLayout';
import { ROUTES } from '@/shared/lib/constants';

function LocationChecker() {
  const location = useLocation();
  return <div data-testid="location-pathname">{location.pathname}</div>;
}

describe('AuthLayout', () => {
  it('рендерит Logo', () => {
    renderWithProviders(<AuthLayout />);
    expect(screen.getByText('SkillSwap')).toBeInTheDocument();
  });

  it('рендерит кнопку "Закрыть"', () => {
    renderWithProviders(<AuthLayout />);
    expect(screen.getByRole('button', { name: 'Закрыть' })).toBeInTheDocument();
  });

  it('при клике на "Закрыть" ведёт на главную', async () => {
    const { user } = renderWithProviders(
      <>
        <AuthLayout />
        <LocationChecker />
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(screen.getByTestId('location-pathname')).toHaveTextContent(ROUTES.HOME);
  });

  it('рендерит Outlet', () => {
    const { container } = renderWithProviders(<AuthLayout />);
    const authLayout = container.querySelector('[class*="authLayout"]');
    expect(authLayout).toBeInTheDocument();
    expect(authLayout?.querySelector('header')).toBeInTheDocument();
  });

  it('не рендерит основной Header', () => {
    renderWithProviders(<AuthLayout />);
    expect(screen.queryByPlaceholderText('Искать навык')).not.toBeInTheDocument();
  });
});
