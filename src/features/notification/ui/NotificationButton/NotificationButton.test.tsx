import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProvider';
import { NotificationButton } from './NotificationButton';

describe('NotificationButton', () => {
  const renderNotificationButton = (props = {}) => {
    return renderWithProviders(<NotificationButton {...props} />, {
      preloadedState: {
        requests: { items: [], isLoading: false, error: null },
        auth: { user: null, token: null, isAuth: false, isLoading: false, error: null },
      },
    });
  };

  it('кнопка рендерится', () => {
    renderNotificationButton();
    expect(screen.getByLabelText('Уведомления')).toBeInTheDocument();
  });

  it('при hasNew отображается индикатор', () => {
    renderNotificationButton({ hasNew: true });
    const button = screen.getByLabelText('Уведомления');
    expect(button.querySelector('[class*="dot"]')).toBeInTheDocument();
  });

  it('dropdown открывается по клику', async () => {
    const { user } = renderNotificationButton({
      hasNew: false,
      notificationsNew: null,
      notificationsOld: null,
    });
    const button = screen.getByLabelText('Уведомления');
    await user.click(button);
    expect(screen.getByText('Тут пока что пусто')).toBeInTheDocument();
  });

  it('dropdown закрывается по повторному клику', async () => {
    const { user } = renderNotificationButton({
      hasNew: false,
      notificationsNew: null,
      notificationsOld: null,
    });
    const button = screen.getByLabelText('Уведомления');
    await user.click(button);
    expect(screen.getByText('Тут пока что пусто')).toBeInTheDocument();
    await user.click(button);
    await waitFor(() => {
      expect(screen.queryByText('Тут пока что пусто')).not.toBeInTheDocument();
    });
  });

  it('пустое состояние отображается', async () => {
    const { user } = renderNotificationButton({
      hasNew: false,
      notificationsNew: null,
      notificationsOld: null,
    });
    const button = screen.getByLabelText('Уведомления');
    await user.click(button);
    expect(screen.getByText('Тут пока что пусто')).toBeInTheDocument();
  });

  it('новые уведомления отображаются в блоке "Новые уведомления"', async () => {
    const { user } = renderNotificationButton({
      hasNew: true,
      notificationsNew: [
        { id: '1', title: 'Новое уведомление', description: 'Описание', isNew: true },
      ],
      notificationsOld: [],
    });
    const button = screen.getByLabelText('Уведомления');
    await user.click(button);
    expect(screen.getByText('Новые уведомления')).toBeInTheDocument();
    expect(screen.getByText('Новое уведомление')).toBeInTheDocument();
    expect(screen.queryByText('Просмотренные')).not.toBeInTheDocument();
  });

  it('просмотренные отображаются в блоке "Просмотренные"', async () => {
    const { user } = renderNotificationButton({
      hasNew: false,
      notificationsNew: [],
      notificationsOld: [{ id: '2', title: 'Просмотренное', description: 'Старое', isNew: false }],
    });
    const button = screen.getByLabelText('Уведомления');
    await user.click(button);
    expect(screen.getByText('Просмотренные')).toBeInTheDocument();
    expect(screen.getByText('Просмотренное')).toBeInTheDocument();
    expect(screen.queryByText('Новые уведомления')).not.toBeInTheDocument();
  });

  it('закрывается по клику вне', async () => {
    const { user } = renderNotificationButton({
      hasNew: false,
      notificationsNew: null,
      notificationsOld: null,
    });
    const button = screen.getByLabelText('Уведомления');
    await user.click(button);
    expect(screen.getByText('Тут пока что пусто')).toBeInTheDocument();
    await user.click(document.body);
    await waitFor(() => {
      expect(screen.queryByText('Тут пока что пусто')).not.toBeInTheDocument();
    });
  });
});
