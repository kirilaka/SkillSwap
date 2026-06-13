import styles from './Avatar.module.scss';
import clsx from 'clsx';
import fallbackSvg from './fallback.svg';

/**
 * Avatar — компонент отображения пользовательского изображения с fallback-заглушкой.
 *
 * Если `src` не передан, отображается fallback-изображение.
 *
 * @param {string} src — URL основного изображения.
 * @param {string} alt — Атрибут alt для доступности.
 * @param {string} [fallbackSrc] — Путь к fallback-изображению.
 * @param {string} [className] — Дополнительные CSS-классы.
 */

interface AvatarProps {
  /** URL основного изображения */
  src: string;
  /** Атрибут alt для доступности */
  alt: string;
  /** Путь к fallback-изображению */
  fallbackSrc?: string;
  /** Дополнительные CSS-классы */
  className?: string;
}

export const Avatar = ({ src, alt, fallbackSrc = fallbackSvg, className }: AvatarProps) => {
  // Если основное изображение не загрузилось — показываем fallback
  const imageSrc = src ? src : fallbackSrc;

  return (
    <div className={clsx(styles.avatar, className)}>
      <img src={imageSrc} alt={alt} />
    </div>
  );
};
