import { ReactNode } from 'react';
import styles from './skillWrapper.module.scss';
import clsx from 'clsx';

type TskillCategory =
  | 'business'
  | 'art'
  | 'language'
  | 'education'
  | 'cosiness'
  | 'health'
  | 'more';
type Tvariant = 'text' | 'icon';

interface IskillWrapper {
  skillCategory: TskillCategory;
  children: ReactNode;
  className?: string;
  variant: Tvariant;
}

export const SkillWrapper = (props: IskillWrapper) => {
  const { skillCategory, children, className, variant } = props;
  return (
    <div
      className={clsx(styles[skillCategory], className, {
        [styles.containerText]: variant == 'text',
        [styles.containerIcon]: variant == 'icon',
      })}
    >
      {children}
    </div>
  );
};
