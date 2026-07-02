// src/features/filtration/ui/FilterCategory/FilterCategory.tsx
import clsx from 'clsx';
import { useState } from 'react';
import { FilterItem } from '../FilterItem/FilterItem';
import { FilterItemType } from '../../models/types';
import styles from './FilterCategory.module.scss';

// Создаем локальный интерфейс для элементов, которые приходят в этот компонент
interface CategoryFilterElement extends FilterItemType {
  id: string;
  isActive?: boolean;
  subFilters?: CategoryFilterElement[];
}

interface FilterCategoryProps {
  /** Заголовок всей категории */
  title: string;
  /** Список фильтров (используем расширенный тип с id и сабфильтрами) */
  filters: CategoryFilterElement[];
  /** обработчик чекбокса категорий */
  onCategoryToggle?: (category: CategoryFilterElement) => void;
  /** обработчик чекбокса сабкатегорий */
  onSubcategoryToggle?: (subcategoryId: string) => void;
  /** Дополнительные классы */
  className?: string;
}

export const FilterCategory = ({
  title,
  filters,
  className,
  onCategoryToggle,
  onSubcategoryToggle,
}: FilterCategoryProps) => {
  // Стейт-объект, где ключ — id категории, значение — boolean (открыта/закрыта)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const toggleSubCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className={clsx(styles.filterCategoryContainer, className)}>
      <h3 className={styles.categoryTitle}>{title}</h3>

      {filters.map((filter) => {
        if (filter.hasSubFilters) {
          const isBranchOpen = !!openCategories[filter.id];
          // Безопасно проверяем активность подфильтров
          const hasActiveChildren = filter.subFilters?.some((sub) => sub.isActive) ?? false;

          return (
            <div key={filter.id} className={styles.categoryBranch}>
              <FilterItem
                id={filter.id}
                label={filter.label}
                hasSubFilters={true}
                isOpen={isBranchOpen}
                isActive={filter.isActive || hasActiveChildren}
                checkboxVariant={filter.checkboxVariant || 'squareMinus'}
                onTextClick={() => toggleSubCategory(filter.id)}
                onCheckboxClick={() => onCategoryToggle?.(filter)}
              />

              <div className={clsx(styles.subCategoryList, { [styles.isOpen]: isBranchOpen })}>
                {filter.subFilters?.map((subFilter) => {
                  return (
                    <FilterItem
                      key={subFilter.id}
                      id={subFilter.id}
                      label={subFilter.label}
                      hasSubFilters={false}
                      checkboxVariant={subFilter.checkboxVariant || 'squareCheck'}
                      isActive={subFilter.isActive}
                      onTextClick={() => onSubcategoryToggle?.(subFilter.id)}
                      onCheckboxClick={() => onSubcategoryToggle?.(subFilter.id)}
                    />
                  );
                })}
              </div>
            </div>
          );
        }

        // Обычный плоский фильтр без подкатегорий
        return (
          <FilterItem
            key={filter.id}
            id={filter.id}
            label={filter.label}
            hasSubFilters={false}
            checkboxVariant={filter.checkboxVariant || 'squareCheck'}
            isActive={filter.isActive}
            onCheckboxClick={() => onCategoryToggle?.(filter)}
          />
        );
      })}
    </div>
  );
};
