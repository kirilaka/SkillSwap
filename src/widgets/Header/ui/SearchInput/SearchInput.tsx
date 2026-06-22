import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { Input, type InputProps } from '@/shared/ui/Input/Input';
import { SearchIcon } from '@/shared/ui/Icons/SearchIcon/SearchIcon';
import styles from './SearchInput.module.scss';

export const SearchInput = forwardRef<HTMLInputElement, InputProps>(function SearchInput(
  { className, ...props },
  ref,
) {
  return (
    <Input
      ref={ref}
      className={clsx(styles.searchInputWrapper, className)}
      iconPosition="left"
      icon={<SearchIcon className={styles.searchIcon} />}
      placeholder="Искать навык"
      {...props}
    />
  );
});
