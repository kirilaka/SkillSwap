import React, { forwardRef, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Box } from '@/shared/ui/Box/Box';
import { Input, InputProps } from '@/shared/ui/Input/Input';
import { ChevronIcon } from '@/shared/ui/Icons/ChevronIcon/ChevronIcon';
import styles from './DdInputSelect.module.scss';
import { IconWrapper } from '@/shared/ui/Icons/IconWrapper';
import { CrossIcon } from '@/shared/ui/Icons/CrossIcon/CrossIcon';

interface DropdownItem {
  id: string;
  label: string;
}
interface DdInputSelectProps extends InputProps {
  /** Массив данных для выбора */
  items: DropdownItem[];
  /** Доп. классы стилизации */
  className?: string;
  /**Передает наружу Id выбранного элемента */
  onSelectItem?: (selectedId: string | null) => void;
}
export const DdInputSelect = forwardRef<HTMLInputElement, DdInputSelectProps>(function DdInputS(
  { placeholder, items, className, onSelectItem, ...props },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleSelect = (id: string) => {
    const selectedItem = items.find((item) => item.id === id);
    setSelectedId(id);
    setInputValue(selectedItem?.label ?? '');
    closeDropdown();
    onSelectItem?.(id);
  };

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleClick();
  };

  const handleClick = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
    }, 500);
  };

  const openDropdown = () => {
    setIsClosing(false);
    setIsOpen(true);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setInputValue('');
    setSelectedId(null);
    onSelectItem?.(null);
  };
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeDropdown();
      }
    };

    const handleDropdownOutside = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleDropdownOutside);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleDropdownOutside);
    };
  }, [isOpen]);
  return (
    <div
      ref={dropdownRef}
      className={clsx(styles.container, className, (isOpen || isClosing) && styles.containerActive)}
    >
      <Box className={clsx(styles.box, isOpen && styles.boxActive)}>
        <Input
          ref={ref}
          className={styles.input}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedId(null);
            openDropdown();
          }}
          onClick={handleClick}
          placeholder={placeholder}
          iconPosition="right"
          icon={
            <IconWrapper>
              {isOpen ? (
                <button
                  type="button"
                  onClick={(e) => {
                    if (!inputValue) return handleIconClick(e);
                    handleClear(e);
                  }}
                >
                  <CrossIcon />
                </button>
              ) : (
                <button type="button" onClick={handleIconClick}>
                  <ChevronIcon isOpen={isOpen} />
                </button>
              )}
            </IconWrapper>
          }
          {...props}
        />
        <div className={styles.option}>
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={clsx(styles.variant, { [styles.selected]: selectedId === item.id })}
              onClick={() => handleSelect(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Box>
    </div>
  );
});
