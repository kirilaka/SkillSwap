import { GenderType } from '@/shared/types';
import { SkillType } from '@/shared/types';
export type ExchangeFilterType = 'all' | SkillType;
export type GenderFilterType = 'any' | GenderType;
export interface FilterItemType {
  /** Текст пункта фильтра */
  label: string;
  /** Наличие дочерних (вложенных) фильтров */
  hasSubFilters?: boolean;
  /** Вариант отображения чекбокса (круглый или квадратный) */
  checkboxVariant?: 'circle' | 'squareMinus' | 'squareCheck';
}

export interface FiltrationState {
  selectedCategoryIds: string[];
  selectedSubcategoryIds: string[];
  exchangeType: ExchangeFilterType;
  gender: GenderFilterType;
  city: string;
  searchValue: string;
}
