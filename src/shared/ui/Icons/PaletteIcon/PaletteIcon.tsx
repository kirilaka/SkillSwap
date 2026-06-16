import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import paletteSvg from './PaletteIcon.svg';

interface PaletteIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const PaletteIcon = ({ className }: PaletteIconProps) => {
  return (
    <IconWrapper className={className}>
      <img src={paletteSvg} alt="" />
    </IconWrapper>
  );
};
