import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';
import { describe, test, expect, vi } from 'vitest';

describe('Dropdown component', () => {
  test('Если isOpen=false, dropdown не отображается', () => {
    render(
      <Dropdown isOpen={false} onClose={vi.fn()}>
        <div>Dropdown Content</div>
      </Dropdown>,
    );
    const childrenContent = screen.queryByText('Dropdown Content');
    expect(childrenContent).toBeNull();
  });

  test('Если isOpen=true, dropdown отображает children', () => {
    render(
      <Dropdown isOpen={true} onClose={vi.fn()}>
        <div>Dropdown Content</div>
      </Dropdown>,
    );
    const childrenContent = screen.queryByText('Dropdown Content');
    expect(childrenContent).toBeInTheDocument();
  });

  test('При клике вне dropdown вызывается onClose', async () => {
    const onCloseMock = vi.fn();
    render(
      <>
        <Dropdown isOpen={true} onClose={onCloseMock}>
          <div>Dropdown Content</div>
        </Dropdown>
        <div data-testid="outside">Outside Content</div>
      </>,
    );

    const outsideElement = screen.getByTestId('outside');

    await userEvent.click(outsideElement);

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  test('При клике внутри dropdown onClose не вызывается', async () => {
    const onCloseMock = vi.fn();
    render(
      <Dropdown isOpen={true} onClose={onCloseMock}>
        <div>Dropdown Content</div>
      </Dropdown>,
    );

    // Ищем сам контент внутри дропдауна, так как проп data-testid компонент не принимает
    const insideElement = screen.getByText('Dropdown Content');
    await userEvent.click(insideElement);

    await waitFor(() => {
      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });

  test('При нажатии Escape вызывается onClose', async () => {
    const onCloseMock = vi.fn();
    render(
      <Dropdown isOpen={true} onClose={onCloseMock}>
        <div>Dropdown Content</div>
      </Dropdown>,
    );

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  test('При размонтировании обработчики событий корректно удаляются', () => {
    const removeListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(
      <Dropdown isOpen={true} onClose={vi.fn()}>
        <div>Dropdown Content</div>
      </Dropdown>,
    );

    unmount();

    expect(removeListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    expect(removeListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    removeListenerSpy.mockRestore();
  });

  test('Компонент принимает className', () => {
    render(
      <Dropdown isOpen={true} onClose={vi.fn()} className="custom-class">
        <div>Dropdown Content</div>
      </Dropdown>,
    );
    const childrenContent = screen.getByText('Dropdown Content');

    expect(childrenContent.parentElement).toHaveClass('custom-class');
  });
});
