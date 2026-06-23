import { forwardRef, useState } from 'react';
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
}

export const DdInputCheckbox = forwardRef<HTMLInputElement, DdInputCheckbox>(function DdInputC(
  { items, placeholder, className, ...props },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = items.find((item) => item.id === selectedId);

  const handleSelect = (id: string) => {
    const newSelectedId = selectedId === id ? null : id;
    setSelectedId(newSelectedId);
  };

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Box className={clsx(styles.container, className)}>
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
    </Box>
  );
});
