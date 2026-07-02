import { useCallback, useState, forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { FilterCategory } from '../FilterCategory/FilterCategory';
import { CheckboxCircle } from '@/shared/ui/Checkbox';
import {
  skillsFilterList,
  exchangeTypeFilterList,
  genderFilterList,
} from '@/features/filtration/models/artFilter';
import type { MockFilterItem } from '@/features/filtration/models/artFilter';
import styles from './FilterPanel.module.scss';
import { ControlChip } from '@/shared/ui/ControlChip/ControlChip';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetFilters,
  selectCity,
  selectExchangeType,
  selectGender,
  selectSearchValue,
  selectSelectedCategoryIds,
  selectSelectedSubcategoryIds,
  setCity,
  setExchangeType,
  setGender,
  toggleCategory,
  toggleSubcategory,
} from '../../models/filtrationSlice';
import { ExchangeFilterType, GenderFilterType } from '../../models/types';
import { selectAvailableFilterCities } from '@/entities/city';
import { FilterItem } from '../FilterItem/FilterItem';

export interface FilterPanelProps {
  /** Доп. классы */
  className?: string;
}

export interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Активна ли кнопка */
  isActive?: boolean;
  /** Лейбл */
  label: string;
  /** ID для aria */
  toggleId: string;
}

/** Тогл-кнопка (radio-стиль) */
export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(function ToggleButton(
  { isActive = false, label, toggleId, className, onClick, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isActive}
      id={toggleId}
      className={clsx(
        styles.toggleButton,
        {
          [styles.toggleButtonActive]: isActive,
        },
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <CheckboxCircle
        isActive={isActive}
        onChange={() => {}}
        id={`checkbox-${toggleId}`}
        name={toggleId}
        className={styles.toggleCheckbox}
      />
      <span
        className={clsx(styles.toggleLabel, {
          [styles.toggleLabelActive]: isActive,
        })}
      >
        {label}
      </span>
    </button>
  );
});

/** Панель фильтрации */
export const FilterPanel = ({ className }: FilterPanelProps) => {
  /** выбранные основные категории */
  const selectedCategoryIds = useAppSelector(selectSelectedCategoryIds);
  /** выбранные подкатегории */
  const selectedSubcategoryIds = useAppSelector(selectSelectedSubcategoryIds);
  /** выбранный тип обмена */
  const exchangeType = useAppSelector(selectExchangeType);
  /** выбранный пол автора */
  const gender = useAppSelector(selectGender);
  /** выбранный город */
  const city = useAppSelector(selectCity);
  /** значение поиска */
  const searchValue = useAppSelector(selectSearchValue);
  const availableCities = useAppSelector(selectAvailableFilterCities);

  const [isShowAllOpen, setIsShowAllOpen] = useState(false);
  const [isShowAllCitiesOpen, setIsShowAllCitiesOpen] = useState(false);

  const dispatch = useAppDispatch();

  const preparedSkillsFilters = skillsFilterList.map((category) => ({
    ...category,
    isActive: selectedCategoryIds.includes(category.id),
    subFilters: category.subFilters?.map((subFilter) => ({
      ...subFilter,
      isActive: selectedSubcategoryIds.includes(subFilter.id),
    })),
  }));

  const preparedExchangeTypeFilters = exchangeTypeFilterList.map((item) => ({
    ...item,
    isActive: item.id === exchangeType,
  }));

  const preparedGenderFilters = genderFilterList.map((item) => ({
    ...item,
    isActive: item.id === gender,
  }));

  const totalActive =
    selectedCategoryIds.length +
    selectedSubcategoryIds.length +
    (exchangeType !== 'all' ? 1 : 0) +
    (gender !== 'any' ? 1 : 0) +
    (city ? 1 : 0) +
    (searchValue ? 1 : 0);

  const handleCategoryToggle = useCallback(
    (category: MockFilterItem) => {
      dispatch(
        toggleCategory({
          categoryId: category.id,
          subcategoryIds: category.subFilters?.map((sub) => sub.id) ?? [],
        }),
      );
    },
    [dispatch],
  );

  const handleSubcategoryToggle = useCallback(
    (id: string) => {
      dispatch(toggleSubcategory(id));
    },
    [dispatch],
  );

  const handleExchangeTypeToggle = useCallback(
    (clickedId: ExchangeFilterType) => {
      dispatch(setExchangeType(clickedId));
    },
    [dispatch],
  );

  const handleGenderToggle = useCallback(
    (clickedId: GenderFilterType) => {
      dispatch(setGender(clickedId));
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handleCitiesToggle = useCallback(
    (cityName: string) => {
      dispatch(setCity(city === cityName ? '' : cityName));
    },
    [dispatch, city],
  );

  const handleShowAllClick = () => {
    setIsShowAllOpen((prev) => !prev);
  };

  return (
    <div className={clsx(styles.filterPanel, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Фильтры
          {totalActive > 0 && <span className={styles.count}>{totalActive}</span>}
        </h2>
        {totalActive > 0 && (
          <ControlChip
            label="Сбросить"
            onClick={handleReset}
            className={styles.resetButton}
            iconVariant="Cross"
          />
        )}
      </div>

      {/* Тип обмена — тогл-кнопки */}
      <div className={styles.toggleSection} role="radiogroup" aria-label="Тип обмена">
        <h3 className={styles.toggleTitle}>Тип обмена</h3>
        <div className={styles.toggleList}>
          {preparedExchangeTypeFilters.map((item) => (
            <ToggleButton
              key={item.id}
              toggleId={`exchange-${item.id}`}
              isActive={item.isActive}
              label={item.label}
              onClick={() => handleExchangeTypeToggle(item.id as ExchangeFilterType)}
            />
          ))}
        </div>
      </div>

      {/* Навыки — чекбоксы с подкатегориями */}
      <div className={styles.categorySection}>
        <div className={styles.skillsCategory}>
          <FilterCategory
            filters={preparedSkillsFilters}
            title="Навыки"
            onCategoryToggle={handleCategoryToggle}
            onSubcategoryToggle={handleSubcategoryToggle}
          />
        </div>
        <ControlChip
          label="Все категории"
          iconVariant="Chevron"
          onClick={handleShowAllClick}
          isOpen={isShowAllOpen}
          className={styles.showAllButton}
        />
      </div>

      {/* Пол автора — тогл-кнопки */}
      <div className={styles.toggleSection} role="radiogroup" aria-label="Пол автора">
        <h3 className={styles.toggleTitle}>Пол автора</h3>
        <div className={styles.toggleList}>
          {preparedGenderFilters.map((item) => (
            <ToggleButton
              key={item.id}
              toggleId={`gender-${item.id}`}
              isActive={item.isActive}
              label={item.label}
              onClick={() => handleGenderToggle(item.id as GenderFilterType)}
            />
          ))}
        </div>
      </div>

      {/* Города — чекбоксы */}
      {availableCities.length > 0 && (
        <div className={styles.categorySection}>
          <h3 className={styles.toggleTitle}>Город</h3>
          <div className={styles.skillsCategory}>
            {availableCities.map((item) => (
              <FilterItem
                key={item.id}
                id={item.id}
                label={item.name}
                hasSubFilters={false}
                checkboxVariant={'squareCheck'}
                isActive={city === item.name}
                onCheckboxClick={() => handleCitiesToggle(item.name)}
              />
              // Здесь нужно доделать вывод макс. кол-ва городов
            ))}
          </div>
          <ControlChip
            label="Все города"
            iconVariant="Chevron"
            onClick={() => setIsShowAllCitiesOpen((prev) => !prev)}
            isOpen={isShowAllCitiesOpen}
            className={styles.showAllButton}
          />
        </div>
      )}
    </div>
  );
};
