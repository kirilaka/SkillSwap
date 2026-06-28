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
} from '@/features/filtration/models/FiltrationUtils';
import styles from './FilterPanel.module.scss';
import { ControlChip } from '@/shared/ui/ControlChip/ControlChip';

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
