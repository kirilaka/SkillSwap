import { skillsFilterList, exchangeTypeFilterList, genderFilterList } from './artFilter';
import type { MockFilterItem } from './artFilter';

/** Считает количество активных фильтров (исключая 'all' и 'any') */
export const countActiveFilters = (filters: MockFilterItem[]): number => {
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
};

/** Сброс всех фильтров к начальному состоянию */
export const getResetFilters = () => ({
  skills: skillsFilterList.map((f: MockFilterItem) => ({
    ...f,
    isActive: false,
    subFilters: f.subFilters?.map((s: MockFilterItem) => ({ ...s, isActive: false })),
  })),
  exchangeType: exchangeTypeFilterList.map((f: MockFilterItem) => ({
    ...f,
    isActive: f.id === 'all',
  })),
  gender: genderFilterList.map((f: MockFilterItem) => ({
    ...f,
    isActive: f.id === 'any',
  })),
});

/** Тогл-логика: только один элемент активен (radio-стиль) */
export const toggleSingleActive = (
  filters: MockFilterItem[],
  clickedId: string,
): MockFilterItem[] =>
  filters.map((f) => ({
    ...f,
    isActive: f.id === clickedId,
  }));

/** Обновление skills с колбэком */
export const updateSkillsWithCallback = (
  updated: MockFilterItem[],
  exchangeType: MockFilterItem[],
  gender: MockFilterItem[],
  onFiltersChange?: (filters: Record<string, MockFilterItem[]>) => void,
) => {
  onFiltersChange?.({ skills: updated, exchangeType, gender });
  return updated;
};

/** Обновление exchangeType с колбэком */
export const updateExchangeTypeWithCallback = (
  newState: MockFilterItem[],
  skills: MockFilterItem[],
  gender: MockFilterItem[],
  onFiltersChange?: (filters: Record<string, MockFilterItem[]>) => void,
) => {
  onFiltersChange?.({ skills, exchangeType: newState, gender });
  return newState;
};

/** Обновление gender с колбэком */
export const updateGenderWithCallback = (
  newState: MockFilterItem[],
  skills: MockFilterItem[],
  exchangeType: MockFilterItem[],
  onFiltersChange?: (filters: Record<string, MockFilterItem[]>) => void,
) => {
  onFiltersChange?.({ skills, exchangeType, gender: newState });
  return newState;
};
