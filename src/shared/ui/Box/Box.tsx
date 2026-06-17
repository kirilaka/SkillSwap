import React from 'react';
import clsx from 'clsx';
import styles from './Box.module.scss';

interface BoxProps {
  /** Дочерние элементы */
  children: React.ReactNode;
  /** Дополнительные CSS-классы */
  className?: string;
}

export const Box = ({ children, className }: BoxProps) => {
  if (!children) return null;

  return <div className={clsx(styles.box, className)}>{children}</div>;
};
