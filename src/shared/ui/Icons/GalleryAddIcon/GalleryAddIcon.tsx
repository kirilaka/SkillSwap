import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import galleryAddSvg from './GalleryAddIcon.svg';

interface GalleryAddIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const GalleryAddIcon = ({ className }: GalleryAddIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={galleryAddSvg} alt="" />
    </IconWrapper>
  );
};
