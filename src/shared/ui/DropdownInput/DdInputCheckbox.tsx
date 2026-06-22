import { useState } from 'react';
import clsx from 'clsx';
import { Box } from '../Box/Box';
import { Input } from '../Input/Input';
import { CheckboxSquare } from '../Checkbox';
import { ChevronIcon } from '../Icons/ChevronIcon/ChevronIcon';
import styles from './DdInputCheckbox.module.scss';
import { IconWrapper } from '../Icons/IconWrapper';

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
interface DdInputCheckbox {
  placeholder: string;
  items: DropdownItem[];
  className?: string;
  onChange?: (selectedId: string | null) => void;
}

export const DdInputCheckbox = ({ items, placeholder, className, onChange }: DdInputCheckbox) => {
  const [isO, setIsO] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = items.find((item) => item.id === selectedId);

  const handleSelect = (id: string) => {
    const newSelectedId = selectedId === id ? null : id;
    setSelectedId(newSelectedId);
    onChange?.(newSelectedId);
  };

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsO((prev) => !prev);
  };

  const handleClick = () => {
    setIsO((prev) => !prev);
  };
  return (
    <Box className={clsx(styles.container, className)}>
      <Box className={clsx(styles.box, isO && styles.boxActive)}>
        <Input
          className={styles.input}
          readOnly
          value={selectedItem?.label ?? ''}
          onClick={handleClick}
          placeholder={placeholder}
          iconPosition="right"
          icon={
            <IconWrapper>
              <button type="button" onClick={handleIconClick}>
                <ChevronIcon isOpen={isO} />
              </button>
            </IconWrapper>
          }
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
    </Box>
  );
};
