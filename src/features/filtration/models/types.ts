export interface FilterItemType {
  /** Текст пункта фильтра */
  label: string;
  /** Наличие дочерних (вложенных) фильтров */
  hasSubFilters?: boolean;
  /** Вариант отображения чекбокса (круглый или квадратный) */
  checkboxVariant?: 'circle' | 'squareMinus' | 'squareCheck';
}
