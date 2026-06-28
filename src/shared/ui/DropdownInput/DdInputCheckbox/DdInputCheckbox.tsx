import React, { forwardRef, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Box } from '../../Box/Box';
import { Input, InputProps } from '../../Input/Input';
import { CheckboxSquare } from '../../Checkbox';
import { ChevronIcon } from '../../Icons/ChevronIcon/ChevronIcon';
import styles from './DdInputCheckbox.module.scss';
import { IconWrapper } from '../../Icons/IconWrapper';

interface DropdownItem {
  id: string;
  label: string;
}

interface DdInputCheckbox extends InputProps {
  /** Массив данных для выбора */
  items: DropdownItem[];
  /** Доп. классы стилизации */
  className?: string;
  /**Передает наружу Id выбранного элемента */
  onSelectItem?: (selectedId: string | null) => void;
}

export const DdInputCheckbox = forwardRef<HTMLInputElement, DdInputCheckbox>(function DdInputC(
  { items, placeholder, className, onSelectItem, ...props },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.id === selectedId);

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

  const handleSelect = (id: string) => {
    const newSelectedId = selectedId === id ? null : id;

    setSelectedId(newSelectedId);
    onSelectItem?.(newSelectedId);
  };

  const handleClick = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleClick();
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
          readOnly
          value={selectedItem?.label ?? ''}
          onClick={handleClick}
          placeholder={placeholder}
          iconPosition="right"
          icon={
            <IconWrapper>
              <button type="button" onClick={handleIconClick}>
                <ChevronIcon isOpen={isOpen} />
              </button>
            </IconWrapper>
          }
          {...props}
        />

        <div className={styles.option}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={clsx(styles.variant, selectedId === item.id && styles.selected)}
              onClick={() => handleSelect(item.id)}
            >
              <CheckboxSquare variant="check" isActive={selectedId === item.id} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </Box>
    </div>
  );
});
