import clsx from 'clsx';
import styles from './SignUpProgress.module.scss';

type stepType = 1 | 2 | 3;

interface signUpProgressProps {
  step: stepType;
  className?: string;
}

export const SignUpProgress = ({ step, className }: signUpProgressProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <span className={styles.text}>Шаг {step} из 3</span>
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
