import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import paletteSvg from './PaletteIcon.svg';
import styles from './PaletteIcon.module.scss';

interface PaletteIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
}

export const PaletteIcon = ({ className }: PaletteIconProps) => {
  return (
    <IconWrapper className={clsx(className)}>
      <img src={paletteSvg} alt="" className={styles.svg} />
    </IconWrapper>
  );
};
