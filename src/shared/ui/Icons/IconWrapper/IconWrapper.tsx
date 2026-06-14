import type { ReactNode } from 'react';

interface IconWrapperProps {
  children: ReactNode;
  className?: string;
}

export const IconWrapper = ({ children, className }: IconWrapperProps) => {
  return <div className={className}>{children}</div>;
};
