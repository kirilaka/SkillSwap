import { ReactNode } from "react";
import styles from './IconWrapper.module.scss'
import clsx from "clsx";


interface IconWrapperProps {
  /** Компонент иконки */
  children: ReactNode;
  /** Доп.классы */
  className?: string;
}

export const IconWrapper = ({
  children,
  className
}: IconWrapperProps) => {
  return(
    <div className={clsx(
    styles.wrapper,
    className)}> {children}
    </div>
  )
}
