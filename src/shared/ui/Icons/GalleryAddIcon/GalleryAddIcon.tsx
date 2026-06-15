import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import galleryAddSvg from './GalleryAddIcon.svg';
import styles from './GalleryAddIcon.module.scss';

interface GalleryAddIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const GalleryAddIcon = ({ className }: GalleryAddIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={galleryAddSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
