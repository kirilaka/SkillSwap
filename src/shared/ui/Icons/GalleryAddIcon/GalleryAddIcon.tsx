import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import GalleryAddSvg from './GalleryAddIcon.svg?react';

interface GalleryAddIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const GalleryAddIcon = ({ className }: GalleryAddIconProps) => {
  return (
    <IconWrapper className={className}>
      <GalleryAddSvg />
    </IconWrapper>
  );
};
