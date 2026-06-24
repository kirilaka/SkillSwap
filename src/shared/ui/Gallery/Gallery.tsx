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
}

export const Gallery = ({ children, className }: GalleryProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [childrenLenght, setChildrenLenght] = useState(children.length - 3);
  const [isHide, setIsHide] = useState(false);
  const childrenLenghtRef = useRef(childrenLenght);

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

  const handleButtonPrevClick = () => {
    childrenLenghtRef.current += 1;
    if (childrenLenghtRef.current < 0) {
      if (isHide) return setIsHide(false);
    } else return setChildrenLenght(childrenLenghtRef.current);
  };

  const handleButtonNextClick = () => {
    childrenLenghtRef.current -= 1;
    if (childrenLenghtRef.current < 0) {
      if (childrenLenghtRef.current == -2 && !isHide) return setIsHide(true);
    } else return setChildrenLenght(childrenLenghtRef.current);
  };

  return (
    <div className={clsx(styles.mainWrapper, className)}>
      {children.length > 1 && (
        <div className={styles.buttonContainer}>
          <button
            className={clsx(
              styles.button,
              styles.buttonPrev,
              childrenLenght == children.length - 3 && styles.hide,
            )}
            ref={prevRef}
            onClick={handleButtonPrevClick}
          >
            <ChevronSvg />
          </button>
          <button
            className={clsx(styles.button, styles.buttonNext, isHide && styles.hide)}
            ref={nextRef}
            onClick={handleButtonNextClick}
          >
            <ChevronSvg />
          </button>
        </div>
      )}
      {children.length > 3 && (
        <div className={clsx(styles.imgOverlay, childrenLenght < 1 && styles.hide)}>
          +{childrenLenght}
        </div>
      )}
      {children.length > 1 && (
        <Swiper
          modules={[Navigation]}
          className={styles.mainSwiper}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={handleSwiperInit}
          allowTouchMove={false}
        >
          {children.map((child, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {children.length > 1 && (
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
};
