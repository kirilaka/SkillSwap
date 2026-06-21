import { ReactNode } from 'react';
import styles from './SkillWrapper.module.scss';
import clsx from 'clsx';
import { SKILL_CATEGORIES } from '@/shared/lib/constants';

type TVariant = 'text' | 'icon';

interface SkillWrapperProps {
  /** Категория скилла */
  skillCategory: SKILL_CATEGORIES;
  /** Дочерний элемент для рендера */
  children: ReactNode;
  /** Доп. классы для стилизации */
  className?: string;
  /** Выбор варианта рендера, для текста или иконки*/
  variant: TVariant;
}

export const SkillWrapper = ({
  skillCategory,
  children,
  className,
  variant,
}: SkillWrapperProps) => {
  return (
    <div
      className={clsx(styles.skillWrapper, styles[skillCategory], className, {
        [styles.skillWrapperText]: variant == 'text',
        [styles.skillWrapperIcon]: variant == 'icon',
      })}
    >
      {children}
    </div>
  );
};
