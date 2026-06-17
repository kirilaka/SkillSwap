import styles from './CheckboxCircle.module.scss';
import clsx from 'clsx';

interface CheckboxCircleProps {
  /** Обработчик клика на CheckboxCircle */
  onClick?: () => void;
  /**Выбор состояния кнопки, начальное значение false */
  isActive?: boolean;
  /**Ид выбранного чекбокса */
  id?: string;
  /**Имя чекбокса */
  name?: string;
  /**Доп. классы для стилизации. */
  className?: string;
}

export const CheckboxCircle = ({
  onClick,
  isActive = false,
  id,
  name,
  className,
}: CheckboxCircleProps) => {
  return (
    <button
      onClick={onClick}
      id={id}
      name={name}
      className={clsx(styles.button, isActive ? styles.isActive : styles.isNotActive, className)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C6.48372 22 2 17.5163 2 12C2 6.48372 6.48372 2 12 2C17.5163 2 22 6.48372 22 12C22 17.5163 17.5163 22 12 22ZM12 3.39535C7.25581 3.39535 3.39535 7.25581 3.39535 12C3.39535 16.7442 7.25581 20.6047 12 20.6047C16.7442 20.6047 20.6047 16.7442 20.6047 12C20.6047 7.25581 16.7442 3.39535 12 3.39535Z"
          fill="currentColor"
        />
        <circle cx="12" cy="12" r="5" fill="currentColor" className={styles.checkboxCheck} />
      </svg>
    </button>
  );
};
