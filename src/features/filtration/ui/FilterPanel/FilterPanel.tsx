import { useCallback, useState, forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { FilterCategory } from '../FilterCategory/FilterCategory';
import { CheckboxCircle } from '../../../../shared/ui/Checkbox';
import { skillsFilterList, exchangeTypeFilterList, genderFilterList } from '../../models/artFilter';
import type { MockFilterItem } from '../../models/artFilter';
import styles from './FilterPanel.module.scss';

export interface FilterPanelProps {
  /** Доп. классы */
  className?: string;
  /** Обработчик изменения фильтров */
  onFiltersChange?: (filters: Record<string, MockFilterItem[]>) => void;
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
export const FilterPanel = ({ className, onFiltersChange }: FilterPanelProps) => {
  const [skills, setSkills] = useState<MockFilterItem[]>(skillsFilterList);
  const [exchangeType, setExchangeType] = useState<MockFilterItem[]>(exchangeTypeFilterList);
  const [gender, setGender] = useState<MockFilterItem[]>(genderFilterList);

  const countActiveFilters = useCallback((filters: MockFilterItem[]): number => {
    let count = 0;
    filters.forEach((filter) => {
      if (filter.isActive && filter.id !== 'all' && filter.id !== 'any') {
        count++;
      }
      if (filter.subFilters) {
        filter.subFilters.forEach((sub: MockFilterItem) => {
          if (sub.isActive) count++;
        });
      }
    });
    return count;
  }, []);

  const totalActive =
    countActiveFilters(skills) + countActiveFilters(exchangeType) + countActiveFilters(gender);

  const handleSkillsChange = useCallback(
    (updated: MockFilterItem[]) => {
      setSkills(updated);
      onFiltersChange?.({ skills: updated, exchangeType, gender });
    },
    [exchangeType, gender, onFiltersChange],
  );

  const handleExchangeTypeToggle = useCallback(
    (clickedId: string) => {
      const newState = exchangeType.map((f) => ({
        ...f,
        isActive: f.id === clickedId,
      }));
      setExchangeType(newState);
      onFiltersChange?.({ skills, exchangeType: newState, gender });
    },
    [exchangeType, skills, gender, onFiltersChange],
  );

  const handleGenderToggle = useCallback(
    (clickedId: string) => {
      const newState = gender.map((f) => ({
        ...f,
        isActive: f.id === clickedId,
      }));
      setGender(newState);
      onFiltersChange?.({ skills, exchangeType, gender: newState });
    },
    [gender, skills, exchangeType, onFiltersChange],
  );

  const handleReset = useCallback(() => {
    setSkills(
      skillsFilterList.map((f: MockFilterItem) => ({
        ...f,
        isActive: false,
        subFilters: f.subFilters?.map((s: MockFilterItem) => ({ ...s, isActive: false })),
      })),
    );
    setExchangeType(
      exchangeTypeFilterList.map((f: MockFilterItem) => ({ ...f, isActive: f.id === 'all' })),
    );
    setGender(genderFilterList.map((f: MockFilterItem) => ({ ...f, isActive: f.id === 'any' })));
  }, []);

  return (
    <div className={clsx(styles.filterPanel, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Фильтры
          {totalActive > 0 && <span className={styles.count}>{totalActive}</span>}
        </h2>
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          Сбросить
        </button>
      </div>

      {/* Тип обмена — тогл-кнопки */}
      <div className={styles.toggleSection} role="radiogroup" aria-label="Тип обмена">
        <h3 className={styles.toggleTitle}>Тип обмена</h3>
        <div className={styles.toggleList}>
          {exchangeType.map((item) => (
            <ToggleButton
              key={item.id}
              toggleId={`exchange-${item.id}`}
              isActive={item.isActive}
              label={item.label}
              onClick={() => handleExchangeTypeToggle(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Навыки — чекбоксы с подкатегориями */}
      <div className={styles.categorySection}>
        <div className={styles.skillsCategory}>
          <FilterCategory
            title="Навыки"
            initialFilters={skills}
            onFiltersChange={handleSkillsChange}
          />
        </div>
        <button type="button" className={styles.showAllButton}>
          Все категории
        </button>
      </div>

      {/* Пол автора — тогл-кнопки */}
      <div className={styles.toggleSection} role="radiogroup" aria-label="Пол автора">
        <h3 className={styles.toggleTitle}>Пол автора</h3>
        <div className={styles.toggleList}>
          {gender.map((item) => (
            <ToggleButton
              key={item.id}
              toggleId={`gender-${item.id}`}
              isActive={item.isActive}
              label={item.label}
              onClick={() => handleGenderToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
