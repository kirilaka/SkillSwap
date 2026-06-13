import styles from './Avatar.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

export const Avatar = ({ src, alt, fallback = '/fallback.svg', className }: AvatarProps) => {
  const [error, setError] = useState(false);

  const handleImgError = () => {
    setError(true);
  };

  // Если основное изображение не загрузилось — показываем fallback
  const imageSrc = !src || error ? fallback : src;

  return (
    <div className={clsx(styles.avatar, className)}>
      <img src={imageSrc} alt={alt} onError={handleImgError} />
    </div>
  );
};
