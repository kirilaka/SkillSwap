import React, { useState } from 'react';
import clsx from 'clsx';
import { Box } from '../Box/Box';
import { Input } from '../Input/Input';
import { ChevronIcon } from '../Icons/ChevronIcon/ChevronIcon';
import styles from './DdInputSelect.module.scss';
import { IconWrapper } from '../Icons/IconWrapper';
import { CrossIcon } from '../Icons/CrossIcon/CrossIcon';

/** Моковые данные для теста компонента
 * const items = [
  { id: '1', label: 'HTML' },
  { id: '2', label: 'CSS' },
  { id: '3', label: 'React' },
  ]
 */

interface DropdownItem {
  id: string;
  label: string;
}
interface DdInputSelectProps {
  placeholder: string;
  items: DropdownItem[];
  className?: string;
  onChange?: (selectedId: string | null) => void;
}
export const DdInputSelect = ({ items, placeholder, className, onChange }: DdInputSelectProps) => {
  const [isO, setIsO] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleSelect = (id: string) => {
    const selectedItem = items.find((item) => item.id === id);
    setSelectedId(id);
    setInputValue(selectedItem?.label ?? '');
    onChange?.(id);
    setIsO(false);
  };

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsO((prev) => !prev);
  };

  const handleClick = () => {
    setIsO((prev) => !prev);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setInputValue('');
    setSelectedId(null);
    onChange?.(null);
    setIsO(true);
  };

  return (
    <Box className={clsx(styles.container, className)}>
      <Box className={clsx(styles.box, isO && styles.boxActive)}>
        <Input
          className={styles.input}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedId(null);
            setIsO(true);
          }}
          onClick={handleClick}
          placeholder={placeholder}
          iconPosition="right"
          icon={
            <IconWrapper>
              {isO ? (
                <button type="button" onClick={handleClear}>
                  <CrossIcon />
                </button>
              ) : (
                <button type="button" onClick={handleIconClick}>
                  <ChevronIcon isOpen={isO} />
                </button>
              )}
            </IconWrapper>
          }
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
};
