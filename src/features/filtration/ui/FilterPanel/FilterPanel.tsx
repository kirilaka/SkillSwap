import { useCallback, useState, forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { FilterCategory } from '../FilterCategory/FilterCategory';
import { CheckboxCircle } from '../../../../shared/ui/Checkbox';
import { skillsFilterList, exchangeTypeFilterList, genderFilterList } from '../../models/artFilter';
import type { MockFilterItem } from '../../models/artFilter';
import {
  countActiveFilters,
  getResetFilters,
  toggleSingleActive,
  updateSkillsWithCallback,
  updateExchangeTypeWithCallback,
  updateGenderWithCallback,
} from '../../models/FIltrationUtils';
import styles from './FilterPanel.module.scss';

export interface FilterPanelProps {
  /** Доп. классы */
  className?: string;
  /** Обработчик изменения фильтров */
  onFiltersChange?: (filters: Record<string, MockFilterItem[]>) => void;
  /** Обработчик клика по "Все категории" */
  onShowAllClick?: () => void;
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
export const FilterPanel = ({ className, onFiltersChange, onShowAllClick }: FilterPanelProps) => {
  const [skills, setSkills] = useState<MockFilterItem[]>(skillsFilterList);
  const [exchangeType, setExchangeType] = useState<MockFilterItem[]>(exchangeTypeFilterList);
  const [gender, setGender] = useState<MockFilterItem[]>(genderFilterList);
  const [isShowAllOpen, setIsShowAllOpen] = useState(false);

  const totalActive =
    countActiveFilters(skills) + countActiveFilters(exchangeType) + countActiveFilters(gender);

  const handleSkillsChange = useCallback(
    (updated: MockFilterItem[]) => {
      setSkills(updated);
      updateSkillsWithCallback(updated, exchangeType, gender, onFiltersChange);
    },
    [exchangeType, gender, onFiltersChange],
  );

  const handleExchangeTypeToggle = useCallback(
    (clickedId: string) => {
      const newState = toggleSingleActive(exchangeType, clickedId);
      setExchangeType(newState);
      updateExchangeTypeWithCallback(newState, skills, gender, onFiltersChange);
    },
    [exchangeType, skills, gender, onFiltersChange],
  );

  const handleGenderToggle = useCallback(
    (clickedId: string) => {
      const newState = toggleSingleActive(gender, clickedId);
      setGender(newState);
      updateGenderWithCallback(newState, skills, exchangeType, onFiltersChange);
    },
    [gender, skills, exchangeType, onFiltersChange],
  );

  const handleReset = useCallback(() => {
    const reset = getResetFilters();
    setSkills(reset.skills);
    setExchangeType(reset.exchangeType);
    setGender(reset.gender);
    onFiltersChange?.({
      skills: reset.skills,
      exchangeType: reset.exchangeType,
      gender: reset.gender,
    });
  }, [onFiltersChange]);

  const handleShowAllClick = useCallback(() => {
    setIsShowAllOpen((prev) => !prev);
    onShowAllClick?.();
  }, [onShowAllClick]);

  return (
    <div className={clsx(styles.filterPanel, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Фильтры
          {totalActive > 0 && <span className={styles.count}>{totalActive}</span>}
        </h2>
        {totalActive > 0 && (
          <button type="button" className={styles.resetButton} onClick={handleReset}>
            Сбросить
          </button>
        )}
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
        <button type="button" className={styles.showAllButton} onClick={handleShowAllClick}>
          Все категории
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(styles.showAllIcon, isShowAllOpen && styles.showAllIconOpen)}
          >
            <path
              d="M2 1L8 7L14 1"
              stroke="#508826"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
