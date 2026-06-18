import { ReactNode } from 'react';
import styles from './SkillWrapper.module.scss';
import clsx from 'clsx';

type SkillCategory = 'business' | 'art' | 'language' | 'education' | 'cosiness' | 'health' | 'more';
type Tvariant = 'text' | 'icon';

interface SkillWrapperProps {
  skillCategory: SkillCategory;
  children: ReactNode;
  className?: string;
  variant: Tvariant;
}

export const SkillWrapper = (props: SkillWrapperProps) => {
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
