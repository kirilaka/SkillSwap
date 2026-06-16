import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import galleryEditSvg from './GalleryEditIcon.svg';

interface GalleryEditIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const GalleryEditIcon = ({ className }: GalleryEditIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={galleryEditSvg} alt="" />
    </IconWrapper>
  );
};
