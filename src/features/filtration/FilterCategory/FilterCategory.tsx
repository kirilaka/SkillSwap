import styles from './FilterCategory.module.scss';
import { FilterItem } from '../ui/FilterItem/FilterItem';
import clsx from 'clsx';
import { ReactNode, useId, useState, isValidElement } from 'react';

interface FilterCategoryProps {
  /** Заголовок категории */
  title: string;
  /** Список фильтров в категории */
  filters: ReactNode[];
  /** Дополнительные классы для стилизации */
  className?: string;
}

export const FilterCategory = ({ title, filters, className }: FilterCategoryProps) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  const handleTextClick = () => {
    setIsOpen((prev) => !prev);
  };

  const hasActiveSubFilters = filters.some((child) => {
    if (isValidElement(child)) {
      return Boolean(child.props.isActive);
    }
    return false;
  });

  return (
    <div className={clsx(styles.categoryBranch, className)}>
      <FilterItem
        id={id}
        label={title}
        hasSubFilters={true}
        isOpen={isOpen}
        isActive={hasActiveSubFilters}
        onTextClick={handleTextClick}
        checkboxVariant="squareMinus"
      />
      <div className={clsx(styles.subCategoryList, { [styles.isOpen]: isOpen })}>{filters}</div>
    </div>
  );
};
