import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import clsx from 'clsx';
import ChevronSvg from '@/shared/ui/Icons/ChevronIcon/Chevron.svg?react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Gallery.module.scss';

interface GalleryProps {
  children: React.ReactNode[];
  className?: string;
  /** Вид галереи.
   * 1-3 = 1 крупное, 3 малых изображения. ( По умолчанию )
   * 4 = 4 изображения в строку */
  variant?: '1-3' | '4';
}

export const Gallery = ({ children, className, variant = '1-3' }: GalleryProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [prevIsHide, setPrevIsHide] = useState(true);
  const [nextIsHide, setNextIsHide] = useState(false);
  const [remainingCount, setRemainingCount] = useState(Math.max(children.length - 3, 0));

  // Обновляем ссылки после того, как Swiper инициализировался
  const handleSwiperInit = (swiper: SwiperType) => {
    if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }

    // Переинициализируем навигацию
    swiper.navigation.init();
    swiper.navigation.update();
  };

  const updateButtons = (swiper: SwiperType) => {
    if (swiper.isBeginning) {
      setPrevIsHide(true);
    } else if (prevIsHide) setPrevIsHide(false);
    if (swiper.isEnd) {
      setNextIsHide(true);
    } else if (nextIsHide) setNextIsHide(false);
  };

  const updateOverlay = (swiper: SwiperType) => {
    const count = Math.max(children.length - swiper.activeIndex - 3, 0);

    setRemainingCount(count);
  };

  if (variant == '1-3') {
    return (
      <div className={clsx(styles.wrapperOf1To3, className)}>
        {children.length > 1 && (
          <div className={styles.buttonContainer}>
            <button
              className={clsx(styles.button, styles.buttonPrev, prevIsHide && styles.hide)}
              ref={prevRef}
            >
              <ChevronSvg />
            </button>
            <button
              className={clsx(styles.button, styles.buttonNext, nextIsHide && styles.hide)}
              ref={nextRef}
            >
              <ChevronSvg />
            </button>
          </div>
        )}
        {children.length > 3 && (
          <div className={clsx(styles.imgOverlay, remainingCount <= 0 && styles.hide)}>
            +{remainingCount}
          </div>
        )}
        {children.length >= 1 && (
          <Swiper
            modules={[Navigation]}
            className={styles.mainSwiper}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              handleSwiperInit(swiper);
              updateButtons(swiper);
              updateOverlay(swiper);
            }}
            onSlideChange={(swiper) => {
              updateButtons(swiper);
              updateOverlay(swiper);
            }}
            allowTouchMove={false}
          >
            {children.map((child, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                {child}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {children.length >= 1 && (
          <div className={styles.subWrapper}>
            <Swiper
              modules={[Navigation]}
              className={styles.subSwiper}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onSwiper={handleSwiperInit}
              direction="vertical"
              spaceBetween={'24px'}
              allowTouchMove={false}
            >
              {children.map((child, index) => (
                <SwiperSlide key={index} className={styles.slide}>
                  {child}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {children.length < 1 && (
          <h2 className={styles.fallback}>Тут могли быть фотографии, но они улетели в отпуск...</h2>
        )}
      </div>
    );
  } else if (variant == '4') {
    return (
      <div className={styles.wrapperOf4}>
        {children.length > 4 && (
          <div className={styles.buttonContainer}>
            <button
              className={clsx(styles.button, styles.buttonPrev, prevIsHide && styles.hide)}
              ref={prevRef}
            >
              <ChevronSvg />
            </button>
            <button
              className={clsx(styles.button, styles.buttonNext, nextIsHide && styles.hide)}
              ref={nextRef}
            >
              <ChevronSvg />
            </button>
          </div>
        )}
        {children.length >= 1 && (
          <Swiper
            modules={[Navigation]}
            className={styles.mainSwiper}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              handleSwiperInit(swiper);
              updateButtons(swiper);
              updateOverlay(swiper);
            }}
            onSlideChange={(swiper) => {
              updateButtons(swiper);
              updateOverlay(swiper);
            }}
            allowTouchMove={false}
            spaceBetween={'24px'}
            slidesPerView={4}
          >
            {children.map((child, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                {child}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {children.length < 1 && (
          <h2 className={styles.fallback}>Предложения не смогли пройти на платформу 9 и 3/4...</h2>
        )}
      </div>
    );
  }
};
