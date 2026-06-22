import clsx from 'clsx';
import { CheckboxCircle, CheckboxSquare } from '../../../../shared/ui/Checkbox';
import { ControlChip } from '../../../../shared/ui/ControlChip/ControlChip';
import { FilterItemType } from '../../models/types';
import styles from './FilterItem.module.scss';

interface FilterItemProps extends FilterItemType {
  /** Уникальный идентификатор фильтра */
  id: string;
  /** Состояние открытого/закрытого пункта (для подфильтров) */
  isOpen?: boolean;
  /** Указывает, является ли пункт активным (выбранным) */
  isActive?: boolean;
  /** Обработчик клика на чекбокс */
  onCheckboxClick?: () => void;
  /** Обработчик клика на текст пункта */
  onTextClick?: () => void;
  /** Имя чекбокса для HTML-формы */
  checkboxName?: string;
  /** Доп.классы */
  className?: string;
}

export const FilterItem = ({
  label,
  hasSubFilters = false,
  isOpen = false,
  isActive = false,
  onCheckboxClick,
  onTextClick,
  checkboxVariant = 'circle',
  id,
  checkboxName,
  className,
}: FilterItemProps) => {
  const renderCheckbox = () => {
    if (checkboxVariant === 'circle') {
      return (
        <CheckboxCircle
          onChange={onCheckboxClick}
          isActive={isActive}
          id={`id-circle-${id}`}
          name={checkboxName}
        />
      );
    }

    const squareVariant = checkboxVariant === 'squareMinus' ? 'minus' : 'check';

    return (
      <CheckboxSquare
        id={`id-square-${id}`}
        name={checkboxName}
        onChange={onCheckboxClick}
        variant={squareVariant}
        isActive={isActive}
      />
    );
  };

  return (
    <div className={clsx(styles.filterItem, className)}>
      {renderCheckbox()}
      <ControlChip
        label={label}
        isOpen={isOpen}
        onClick={onTextClick}
        isActive={isActive}
        iconVariant={hasSubFilters ? 'Chevron' : ''}
        className={styles.chipFlex}
      />
    </div>
  );
};
