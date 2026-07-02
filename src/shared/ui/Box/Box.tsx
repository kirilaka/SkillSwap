import clsx from 'clsx';
import styles from './Box.module.scss';
import { HTMLAttributes, ReactNode } from 'react';

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  /** Дочерние элементы */
  children: ReactNode;
  /** Дополнительные CSS-классы */
  className?: string;
}
export const Box = ({ children, className, ...props }: BoxProps) => {
  if (!children) return null;

  return (
    <div className={clsx(styles.box, className)} {...props}>
      {children}
    </div>
  );
};
