import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Gallery } from './Gallery';
import { describe, test, expect, vi } from 'vitest';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Swiper as RealSwiper } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

type SwiperOnSwiperFn = ComponentPropsWithoutRef<typeof RealSwiper>['onSwiper'];

vi.mock('swiper/react', () => ({
  Swiper: ({ children, onSwiper }: { children: ReactNode; onSwiper: SwiperOnSwiperFn }) => {
    if (onSwiper) {
      onSwiper({
        params: { navigation: {} },
        navigation: {
          init: vi.fn(),
          update: vi.fn(),
        },
      } as unknown as SwiperType);
    }
    return <div data-testid="mock-swiper">{children}</div>;
  },
  SwiperSlide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('/src/shared/ui/Icons/ChevronIcon/Chevron.svg?react', () => ({
  default: () => <span data-testid="chevron-icon" />,
}));

describe('Gallery Component', () => {
  test('1. Отображает fallback-текст для варианта 1-3, если передан пустой массив', () => {
    render(<Gallery variant="1-3">{[]}</Gallery>);
    expect(
      screen.getByText('Тут могли быть фотографии, но они улетели в отпуск...'),
    ).toBeInTheDocument();
  });

  test('2. Отображает fallback-текст для варианта 4, если передан пустой массив', () => {
    render(<Gallery variant="4">{[]}</Gallery>);
    expect(
      screen.getByText('Предложения не смогли пройти на платформу 9 и 3/4...'),
    ).toBeInTheDocument();
  });

  test('3. Корректно отображает одно изображение и принимает className', () => {
    const singleImage = [<img key="1" src="#" alt="Одинокий слайд" />];
    const { container } = render(
      <Gallery className="super-custom-gallery" variant="1-3">
        {singleImage}
      </Gallery>,
    );

    const images = screen.getAllByAltText('Одинокий слайд');
    expect(images[0]).toBeInTheDocument();

    expect(container.querySelectorAll('button').length).toBe(0);
    expect(container.firstChild).toHaveClass('super-custom-gallery');
  });

  test('4. Корректно отображает список из нескольких изображений', () => {
    const mockImages = [
      <img key="1" src="#" alt="Фото 1" />,
      <img key="2" src="#" alt="Фото 2" />,
      <img key="3" src="#" alt="Фото 3" />,
    ];
    render(<Gallery variant="1-3">{mockImages}</Gallery>);

    expect(screen.getAllByAltText('Фото 1')[0]).toBeInTheDocument();
    expect(screen.getAllByAltText('Фото 2')[0]).toBeInTheDocument();
    expect(screen.getAllByAltText('Фото 3')[0]).toBeInTheDocument();
    expect(screen.queryByText(/^\+/)).toBeNull();
  });

  test('5. Отображает корректное число в оверлее, если изображений больше 3 (в варианте 1-3)', () => {
    const sixImages = Array.from({ length: 6 }, (_, i) => (
      <img key={i} src="#" alt={`Фото ${i}`} />
    ));
    render(<Gallery variant="1-3">{sixImages}</Gallery>);

    expect(screen.getByText('+3')).toBeInTheDocument();
  });

  test('6. Изменяет состояние кнопок и оверлея при клике на Next в варианте 1-3', async () => {
    const fourImages = Array.from({ length: 4 }, (_, i) => (
      <img key={i} src="#" alt={`Фото ${i}`} />
    ));
    const { container } = render(<Gallery variant="1-3">{fourImages}</Gallery>);

    const overlay = screen.getByText('+1');
    expect(overlay).toBeInTheDocument();

    const nextButton = container.querySelectorAll('button')[1];
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(overlay).toHaveClass(/hide/);
    });
  });

  test('7. Скрывает кнопку Next в варианте 4, когда достигнут предел слайдов', async () => {
    const fiveImages = Array.from({ length: 5 }, (_, i) => (
      <img key={i} src="#" alt={`Фото ${i}`} />
    ));
    const { container } = render(<Gallery variant="4">{fiveImages}</Gallery>);

    const nextButton = container.querySelectorAll('button')[1];
    expect(nextButton).not.toHaveClass(/hide/);

    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(nextButton).toHaveClass(/hide/);
    });
  });
});
