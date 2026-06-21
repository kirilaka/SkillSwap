import { useState } from 'react';
import { Box } from '../Box/Box';
import { Input } from '../Input/Input';
import styles from './DropdownInput.module.scss';
import clsx from 'clsx';
import { Button } from '../Button/Button';

export const DropdownInput = () => {
  const [isO, setIsO] = useState(false);
  return (
    <Box className={styles.container}>
      <Box className={clsx(styles.box, isO && styles.boxActive)}>
        <Button onClick={() => setIsO(!isO)}>click</Button>
      </Box>
      <Input className={styles.input} disabled={isO} onClick={() => setIsO(!isO)} />
    </Box>
  );
};
