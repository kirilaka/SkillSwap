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
  initialFilters: CategoryFilterElement[];
  /** Дополнительные классы */
  className?: string;
  /** Колбэк, который сообщает наверх актуальное состояние фильтров после изменений */
  onFiltersChange?: (updatedFilters: CategoryFilterElement[]) => void;
}

export const FilterCategory = ({
  title,
  initialFilters,
  className,
  onFiltersChange,
}: FilterCategoryProps) => {
  // Стейт-объект, где ключ — id категории, значение — boolean (открыта/закрыта)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  // Стейт для управления активностью чекбоксов
  const [filters, setFilters] = useState<CategoryFilterElement[]>(initialFilters);

  const toggleSubCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCheckboxClick = (clickedId: string) => {
    const updatedFilters = filters.map((filter) => {
      // случай 1: Кликнули на родительский чекбокс (например, '2')
      if (filter.id === clickedId) {
        const nextActiveState = !filter.isActive;

        return {
          ...filter,
          isActive: nextActiveState,
          // Условие: выбираем/отменяем все дочерние чекбоксы
          subFilters: filter.subFilters?.map((sub) => ({
            ...sub,
            isActive: nextActiveState,
          })),
        };
      }

      // случай 2: Кликнули на дочерний чекбокс (например, '2.1')
      if (filter.hasSubFilters && filter.subFilters) {
        const hasChild = filter.subFilters.some((sub) => sub.id === clickedId);

        if (hasChild) {
          // Обновляем состояние конкретного ребенка
          const updatedSubFilters = filter.subFilters.map((sub) =>
            sub.id === clickedId ? { ...sub, isActive: !sub.isActive } : sub,
          );

          // Проверяем, выбран ли хотя бы один ребенок
          const anyChildActive = updatedSubFilters.some((sub) => sub.isActive);

          return {
            ...filter,
            subFilters: updatedSubFilters,
            // Условие: если выбран дочерний, родительский помечается выбранным
            isActive: anyChildActive,
          };
        }
      }

      // Если кликнули по обычному плоскому фильтру без подкатегорий
      if (filter.id === clickedId) {
        return { ...filter, isActive: !filter.isActive };
      }

      return filter;
    });

    // Обновляем локальный стейт компонента
    setFilters(updatedFilters);
    // Прокидываем изменения наверх родителю страницы/стору
    onFiltersChange?.(updatedFilters);
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
                onCheckboxClick={() => handleCheckboxClick(filter.id)}
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
                      onCheckboxClick={() => handleCheckboxClick(subFilter.id)}
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
            onCheckboxClick={() => handleCheckboxClick(filter.id)}
          />
        );
      })}
    </div>
  );
};
