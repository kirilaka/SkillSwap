import { clsx } from 'clsx';
import { MoonIcon } from '@/shared/ui/Icons/MoonIcon/MoonIcon';
import { SunIcon } from '@/shared/ui/Icons/SunIcon/SunIcon';

import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
  /** Цветовая схема приложения для покраски иконки ('light' или 'dark') */
  colorScheme: 'dark' | 'light';
  /** Обработчик клика для переключения темы */
  onClick: () => void;
  /** Дополнительные CSS-классы для внешней стилизации */
  className?: string;
}

export const ThemeToggle = ({ colorScheme = 'light', onClick, className }: ThemeToggleProps) => {
  return (
    <button
      type="button"
      aria-label="Переключить тему"
      onClick={onClick}
      className={clsx(styles.toggleButton, className)}
    >
      {colorScheme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
