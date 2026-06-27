import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { DayPicker, type Matcher, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format, parse, isValid, startOfDay, isBefore, isAfter } from 'date-fns';
import { ru } from 'date-fns/locale';
import clsx from 'clsx';

import { Input } from '@/shared/ui/Input/Input';
import { CalendarIcon } from '@/shared/ui/Icons/CalendarIcon/CalendarIcon';
import { ChevronIcon } from '@/shared/ui/Icons/ChevronIcon/ChevronIcon';

import styles from './DatePicker.module.scss';

const DATE_FORMAT = 'dd.MM.yyyy';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  error?: string;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);

  useEffect(() => {
    if (!isFocusedRef.current) {
      setInputValue(value ? formatDate(value) : '');
    }
  }, [value]);

  useEffect(() => {
    if (error) setInputError(null);
  }, [error]);

  const displayError = error || inputError;

  const toggleCalendar = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleDaySelect = (date: Date | undefined) => {
    onChange(date);
    setInputError(null);
    setInputValue(date ? formatDate(date) : '');
    setIsOpen(false);
  };

  const closeCalendar = () => {
    setIsOpen(false);
  };

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
      setInputValue(value ? formatDate(value) : '');
      return;
    }

    if (!isDateInRange(parsed, minDate, maxDate)) {
      setInputError('Дата вне допустимого диапазона');
      setInputValue(value ? formatDate(value) : '');
      return;
    }

    setInputError(null);
    onChange(parsed);
    setInputValue(formatDate(parsed));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputError(null);
    setInputValue(event.target.value.replace(/[^\d.]/g, ''));
  };

  const handleInputFocus = () => {
    isFocusedRef.current = true;
  };

  const handleContainerBlur = (event: FocusEvent<HTMLDivElement>) => {
    isFocusedRef.current = false;

    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && containerRef.current?.contains(nextTarget)) return;

    commitInputValue();
  };

  const handleIconMouseDown = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCalendar();
      }
    };

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeCalendar();
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
  }, [isOpen]);

  const containerClasses = clsx(
    styles.datePicker,
    {
      [styles.disabled]: disabled,
    },
    className,
  );

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
        onFocus={handleInputFocus}
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
        icon={
          <button
            type="button"
            className={styles.iconTrigger}
            onMouseDown={handleIconMouseDown}
            onClick={toggleCalendar}
            disabled={disabled}
            aria-label="Открыть календарь"
          >
            <CalendarIcon />
          </button>
        }
      />

      {inputError && !error && <div className={styles.errorMessage}>{inputError}</div>}

      {isOpen && (
        <div className={styles.popover}>
          <DayPicker
            mode="single"
            selected={value}
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
                const selectOptions = options || [];
                return (
                  <div className={styles.selectWrapper}>
                    <select value={selectValue} onChange={selectOnChange}>
                      {selectOptions.map((opt) => (
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
        </div>
      )}
    </div>
  );
};
