export interface FilterItemType {
  /** Текст пункта фильтра */
  label: string;
  /** Наличие дочерних (вложенных) фильтров */
  hasSubFilters?: boolean;
  /** Вариант отображения чекбокса (круглый или квадратный) */
  checkboxVariant?: 'circle' | 'squareMinus' | 'squareCheck';
}

export type ExchangeType = 'all' | 'teach' | 'learn';
export type GenderFilter = 'any' | 'male' | 'female';
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  city: string;
  age: number;
  gender: GenderFilter;
  description: string;
}

export interface FiltrationState {
  selectedCategoryIds: string[];
  selectedSubcategoryIds: string[];
  exchangeType: ExchangeType;
  gender: GenderFilter;
  city: string;
  searchValue: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  type: 'teach' | 'learn';
  category: string;
  categoryId: string;
  subcategory: string;
  subcategoryId: string;
  tags: string[];
  imageUrl: string | null;
  authorId: string;
  createdAt: string;
}
