import { useState, useEffect, useRef, type ChangeEvent, type FocusEvent, useCallback } from 'react';
import { DayPicker, type Matcher, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format, parse, isValid, startOfDay, isBefore, isAfter } from 'date-fns';
import { ru } from 'date-fns/locale';
import clsx from 'clsx';

import { Input } from '@/shared/ui/Input/Input';
import { CalendarIcon } from '@/shared/ui/Icons/CalendarIcon/CalendarIcon';
import { ChevronIcon } from '@/shared/ui/Icons/ChevronIcon/ChevronIcon';

import styles from './DatePicker.module.scss';
import { Button } from '../Button/Button';

const DATE_FORMAT = 'dd.MM.yyyy';

interface DatePickerProps {
  /** выбранная дата */
  value?: Date;
  /** обработчик выбора даты */
  onChange: (date: Date | undefined) => void;
  /** текст, который отображается, если дата не выбрана */
  placeholder?: string;
  /** блокирует открытие календаря и выбор даты*/
  disabled?: boolean;
  /** минимальная доступная для выбора дата */
  minDate?: Date;
  /** максимальная доступная для выбора дата*/
  maxDate?: Date;
  /**  текст ошибки, отображаемый под компонентом.*/
  error?: string;
  /**  дополнительные классы для внешнего контейнера */
  className?: string;
}

const formatDate = (date: Date) => format(date, DATE_FORMAT, { locale: ru });

const parseDateInput = (text: string): Date | undefined => {
  const trimmed = text.trim();
  if (!trimmed) return undefined;

  const parsed = parse(trimmed, DATE_FORMAT, new Date(), { locale: ru });
  if (!isValid(parsed) || formatDate(parsed) !== trimmed) return undefined;

  return startOfDay(parsed);
};

const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  const day = startOfDay(date);
  if (minDate && isBefore(day, startOfDay(minDate))) return false;
  if (maxDate && isAfter(day, startOfDay(maxDate))) return false;
  return true;
};

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Выберите дату',
  disabled = false,
  minDate,
  maxDate,
  error,
  className = '',
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(() => (value ? formatDate(value) : ''));
  const [inputError, setInputError] = useState<string | null>(null);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | undefined>(value);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value ? formatDate(value) : '');
    setTempSelectedDate(value);
    setInputError(null);
  }, [value]);

  useEffect(() => {
    if (error) setInputError(null);
  }, [error]);

  const displayError = error || inputError;

  const toggleCalendar = () => {
    if (!disabled) {
      if (!isOpen) {
        setTempSelectedDate(value);
      }
      setIsOpen((prev) => !prev);
    }
  };

  const handleDaySelect = (date: Date | undefined) => {
    setTempSelectedDate(date);
  };

  const handleConfirm = () => {
    onChange(tempSelectedDate);
    setInputError(null);
    setInputValue(tempSelectedDate ? formatDate(tempSelectedDate) : '');
    setIsOpen(false);
  };

  const handleCancel = useCallback(() => {
    setTempSelectedDate(value);
    setIsOpen(false);
  }, [value]);
  const commitInputValue = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setInputError(null);
      if (value) onChange(undefined);
      return;
    }

    const parsed = parseDateInput(trimmed);

    if (!parsed) {
      setInputError('Введите дату в формате дд.мм.гггг');
      return;
    }

    if (!isDateInRange(parsed, minDate, maxDate)) {
      setInputError('Дата вне допустимого диапазона');
      return;
    }

    setInputError(null);
    onChange(parsed);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputError(null);
    setInputValue(event.target.value.replace(/[^\d.]/g, ''));
  };

  const handleContainerBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && containerRef.current?.contains(nextTarget)) return;

    commitInputValue();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleCancel();
    };

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleCancel();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleCancel]);

  const containerClasses = clsx(styles.datePicker, { [styles.disabled]: disabled }, className);

  const disabledMatchers: Matcher[] = [];
  if (minDate) disabledMatchers.push({ before: minDate });
  if (maxDate) disabledMatchers.push({ after: maxDate });

  const defaultClassNames = getDefaultClassNames();

  const calendarClassNames = {
    ...defaultClassNames,
    root: clsx(defaultClassNames.root, styles.calendarRoot),
    month_caption: clsx(defaultClassNames.month_caption, styles.monthCaption),
    dropdowns: clsx(defaultClassNames.dropdowns, styles.dropdowns),
    nav: styles.navHidden,
    button_previous: styles.navHidden,
    button_next: styles.navHidden,
    caption_label: styles.captionLabelHidden,
    month_grid: clsx(defaultClassNames.month_grid, styles.monthGrid),
    weekday: clsx(defaultClassNames.weekday, styles.weekday),
    day: clsx(defaultClassNames.day, styles.day),
    day_button: clsx(defaultClassNames.day_button, styles.dayButton),
    selected: clsx(defaultClassNames.selected, styles.daySelected),
    outside: clsx(defaultClassNames.outside, styles.dayOutside),
    disabled: clsx(defaultClassNames.disabled, styles.dayDisabled),
    today: clsx(defaultClassNames.today, styles.dayToday),
  };

  return (
    <div ref={containerRef} className={containerClasses} onBlur={handleContainerBlur}>
      <Input
        disabled={disabled}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onClick={toggleCalendar}
        maxLength={10}
        inputMode="numeric"
        iconPosition="right"
        validate={() => error || null}
        showErrorOn="change"
        className={clsx(
          styles.input,
          isOpen && styles.inputOpen,
          displayError && styles.inputError,
        )}
        icon={<CalendarIcon className={styles.calendarIcon} />}
      />

      {inputError && !error && <div className={styles.errorMessage}>{inputError}</div>}

      {isOpen && (
        <div className={styles.popover}>
          <DayPicker
            mode="single"
            selected={tempSelectedDate}
            onSelect={handleDaySelect}
            locale={ru}
            weekStartsOn={1}
            captionLayout="dropdown"
            classNames={calendarClassNames}
            startMonth={new Date(1940, 0)}
            endMonth={new Date(new Date().getFullYear() + 10, 11)}
            disabled={disabledMatchers.length > 0 ? disabledMatchers : undefined}
            components={{
              Dropdown: ({ value: selectValue, onChange: selectOnChange, options }) => {
                const dropdownOptions = options || [];
                return (
                  <div className={styles.selectWrapper}>
                    <select value={selectValue} onChange={selectOnChange}>
                      {dropdownOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <span className={styles.selectArrow}>
                      <ChevronIcon isOpen={false} />
                    </span>
                  </div>
                );
              },
            }}
          />

          <div className={styles.popoverActions}>
            <Button buttonType="secondary" className={styles.cancelButton} onClick={handleCancel}>
              Отмена
            </Button>
            <Button buttonType="primary" className={styles.confirmButton} onClick={handleConfirm}>
              Выбрать
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
