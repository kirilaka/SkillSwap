import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import galleryEditSvg from './GalleryEditIcon.svg';
import styles from './GalleryEditIcon.module.scss';

interface GalleryEditIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const GalleryEditIcon = ({ className }: GalleryEditIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={galleryEditSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
