import { forwardRef } from 'react';
import styles from './CheckboxSquare.module.scss';
import clsx from 'clsx';
import { CheckboxProps } from '../index';

interface CheckboxSquareProps extends CheckboxProps {
  variant: 'minus' | 'check';
}

export const CheckboxSquare = forwardRef<HTMLInputElement, CheckboxSquareProps>(
  function CheckboxSquare({ isActive = false, variant = 'check', className, ...props }, ref) {
    return (
      <label className={clsx(styles.wrapper, className)}>
        <input
          ref={ref}
          type="checkbox"
          checked={isActive}
          className={styles.checkbox}
          {...props}
        />
        <svg
          className={clsx(styles.icon, isActive ? styles.isActive : styles.isNotActive)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M9.209 2.5h5.582c2.468 0 4.11.53 5.145 1.564S21.5 6.741 21.5 9.21v5.582c0 2.468-.53 4.11-1.564 5.145S17.259 21.5 14.79 21.5H9.209c-2.468 0-4.11-.53-5.145-1.564S2.5 17.259 2.5 14.79V9.209c0-2.468.53-4.11 1.564-5.145S6.741 2.5 9.21 2.5Z"
            className={styles.checkboxFrame}
          />
          {variant === 'check' && (
            <path
              fill="#292d32"
              d="M16.78 8.63a.755.755 0 0 0-1.06 0l-5.14 5.14-2.3-2.3a.755.755 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2.83 2.83a.75.75 0 0 0 1.06 0l5.67-5.67c.29-.29.29-.77 0-1.06"
              className={styles.checkboxCheck}
            />
          )}
          {variant === 'minus' && (
            <path
              fill="currentColor"
              d="M8 11.25c-.41 0-.75.34-.75.75s.34.75.75.75h8c.41 0 .75-.34.75-.75s-.34-.75-.75-.75z"
              className={styles.checkboxMinus}
            />
          )}
        </svg>
      </label>
    );
  },
);
