import clsx from 'clsx';
import styles from './SignUpProgress.module.scss';

type StepType = 1 | 2 | 3;

interface signUpProgressProps {
  /** Шаг регистрации */
  step: StepType;
  /** Доп. классы для стилизации */
  className?: string;
}

export const SignUpProgress = ({ step = 1, className }: signUpProgressProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <h2 className={styles.text}>Шаг {step} из 3</h2>
      <ul className={styles.indicatorContainer}>
        <li className={clsx(styles.indicator, styles.indicatorActive)}></li>
        <li
          className={clsx(
            styles.indicator,
            step >= 2 ? styles.indicatorActive : styles.indicatorDisabled,
          )}
        ></li>
        <li
          className={clsx(
            styles.indicator,
            step == 3 ? styles.indicatorActive : styles.indicatorDisabled,
          )}
        ></li>
      </ul>
    </div>
  );
};
