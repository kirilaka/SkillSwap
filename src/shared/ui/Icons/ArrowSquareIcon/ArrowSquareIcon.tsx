import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import arrowSquareSvg from './ArrowSquareIcon.svg';
import clsx from 'clsx';
import styles from './ArrowSquareIcon.module.scss';

type Direction = 'Up' | 'Down' | 'Left' | 'Right';

interface ArrowSquareIconProps {
  /** Направление стрелки */
  direction?: Direction;
  /** Дополнительные CSS-классы */
  className?: string;
}

export const ArrowSquareIcon = ({ direction = 'Left', className }: ArrowSquareIconProps) => {
  return (
    <IconWrapper className={clsx(styles[`direction${direction}`], className)}>
      <img src={arrowSquareSvg} alt="" />
    </IconWrapper>
  );
};
