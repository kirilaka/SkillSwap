import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';
import { Box } from '../Box/Box';
import { Input, InputProps } from '../Input/Input';
import { ChevronIcon } from '../Icons/ChevronIcon/ChevronIcon';
import styles from './DdInputSelect.module.scss';
import { IconWrapper } from '../Icons/IconWrapper';
import { CrossIcon } from '../Icons/CrossIcon/CrossIcon';

interface DropdownItem {
  id: string;
  label: string;
}
interface DdInputSelectProps extends InputProps {
  /** Массив данных для выбора */
  items: DropdownItem[];
  /** Доп. классы стилизации */
  className?: string;
}
export const DdInputSelect = forwardRef<HTMLInputElement, DdInputSelectProps>(function DdInputS(
  { placeholder, items, className, ...props },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleSelect = (id: string) => {
    const selectedItem = items.find((item) => item.id === id);
    setSelectedId(id);
    setInputValue(selectedItem?.label ?? '');
    setIsOpen(false);
  };

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setInputValue('');
    setSelectedId(null);
  };

  return (
    <Box className={clsx(styles.container, className)}>
      <Box className={clsx(styles.box, isOpen && styles.boxActive)}>
        <Input
          ref={ref}
          className={styles.input}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedId(null);
            setIsOpen(true);
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
    </Box>
  );
});
