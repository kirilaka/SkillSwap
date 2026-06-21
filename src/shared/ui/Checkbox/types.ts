import { InputHTMLAttributes } from 'react';

/** Содержит InputHTMLAttributes +
 *
 * @param isActive - выбор состояния кнопки, начальное значение false.
 * @param className - Доп. классы для стилизации.
 */
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /**Выбор состояния кнопки, начальное значение false */
  isActive?: boolean;
  /**Доп. классы для стилизации. */
  className?: string;
}
