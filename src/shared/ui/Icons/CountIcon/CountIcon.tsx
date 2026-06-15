import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import clsx from 'clsx';
import countLeftSvg from './CountLeftIcon.svg';
import countRightSvg from './CountRightIcon.svg';
import styles from './CountIcon.module.scss';

/**
 * CountIcon — компонент иконки с двумя частями и отдельными обработчиками клика.
 *
 * @param {string} className — Дополнительные CSS-классы.
 * @param {() => void} onClickLeft — Обработчик клика по левой иконке.
 * @param {() => void} onClickRight — Обработчик клика по правой иконке.
 */
interface CountIconProps {
  /** Дополнительные CSS-классы */
  className?: string;
  /** Обработчик клика по левой иконке */
  onClickLeft?: () => void;
  /** Обработчик клика по правой иконке */
  onClickRight?: () => void;
}

export const CountIcon = ({ className, onClickLeft, onClickRight }: CountIconProps) => {
  return (
    <div className={clsx(className)}>
      <button type="button" onClick={onClickLeft}>
        <IconWrapper>
          <img src={countLeftSvg} alt="Left" className={styles.svg} />
        </IconWrapper>
      </button>

      <button type="button" onClick={onClickRight}>
        <IconWrapper>
          <img src={countRightSvg} alt="Right" className={styles.svg} />
        </IconWrapper>
      </button>
    </div>
  );
};
