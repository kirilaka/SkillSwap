export interface SidebarItemProps {
  /** Текст элемента */
  label: string;
  /** Путь куда ведет элемент */
  path: string;
  /** Иконка элемента */
  Icon?: React.ComponentType<{ className?: string }>;
}
