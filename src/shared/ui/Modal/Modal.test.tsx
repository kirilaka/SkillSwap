// src/shared/ui/Modal/Modal.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

// Создаём modal-root перед каждым тестом
beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
});

// Убираем modal-root после каждого теста
afterEach(() => {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
  // Сбрасываем стили body
  document.body.style.overflow = '';
  document.body.style.paddingInlineEnd = '';
});

describe('Modal', () => {
  it('отображает контент, если модалка открыта', async () => {
    render(
      <Modal isOpen={true}>
        <div data-testid="modal-content">Контент модалки</div>
      </Modal>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    });
  });

  it('не отображает контент, если модалка закрыта', () => {
    render(
      <Modal isOpen={false}>
        <div data-testid="modal-content">Контент модалки</div>
      </Modal>,
    );

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('клик по overlay вызывает onClose', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div data-testid="modal-content">Контент</div>
      </Modal>,
    );

    // Кликаем по overlay (вне content)
    const overlay = screen.getByTestId('modal-content').parentElement?.parentElement;
    if (overlay) {
      await user.click(overlay);
    }

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('клик по контенту модалки не вызывает onClose', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div data-testid="modal-content">Контент</div>
      </Modal>,
    );

    await user.click(screen.getByTestId('modal-content'));

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('нажатие Escape вызывает onClose', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Контент</div>
      </Modal>,
    );

    await user.keyboard('{Escape}');

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('рендерит children', async () => {
    render(
      <Modal isOpen={true}>
        <h1 data-testid="modal-title">Заголовок</h1>
        <p>Текст</p>
      </Modal>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('modal-title')).toBeInTheDocument();
      expect(screen.getByText('Текст')).toBeInTheDocument();
    });
  });

  it('принимает и применяет className', async () => {
    render(
      <Modal isOpen={true} className="my-custom-class">
        <div>Контент</div>
      </Modal>,
    );

    await waitFor(() => {
      expect(document.querySelector('.my-custom-class')).toBeInTheDocument();
    });
  });

  it('блокирует скролл body при открытии', async () => {
    render(
      <Modal isOpen={true}>
        <div>Контент</div>
      </Modal>,
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('разблокирует скролл body при закрытии', async () => {
    const { rerender } = render(
      <Modal isOpen={true}>
        <div>Контент</div>
      </Modal>,
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    rerender(
      <Modal isOpen={false}>
        <div>Контент</div>
      </Modal>,
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('');
    });
  });
});
