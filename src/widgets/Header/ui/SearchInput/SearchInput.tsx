import { clsx } from 'clsx';
import { forwardRef, type ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSearchValue, setSearchValue } from '@/features/filtration/models/filtrationSlice';
import { Input, type InputProps } from '@/shared/ui/Input/Input';
import { SearchIcon } from '@/shared/ui/Icons/SearchIcon/SearchIcon';
import styles from './SearchInput.module.scss';

export const SearchInput = forwardRef<HTMLInputElement, InputProps>(function SearchInput(
  { className, ...props },
  ref,
) {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectSearchValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <Input
      ref={ref}
      className={clsx(styles.searchInputWrapper, className)}
      iconPosition="left"
      icon={<SearchIcon className={styles.searchIcon} />}
      placeholder="Искать навык"
      value={searchValue}
      onChange={handleChange}
      {...props}
    />
  );
});
