import clsx from 'clsx';
import styles from './HeaderNavigation.module.scss';
import { ControlChip } from '@/shared/ui/ControlChip/ControlChip';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { useState } from 'react';

interface HeaderNavigationProps {
  className?: string;
}

export const HeaderNavigation = ({ className }: HeaderNavigationProps) => {
  const [isSkillOpen, setIsSkillOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  const handleSlillClick = () => {
    setIsSkillOpen((prev) => !prev);
    setIsProjectOpen(false);
  };

  const handleProjectClick = () => {
    setIsProjectOpen((prev) => !prev);
    setIsSkillOpen(false);
  };
  return (
    <>
      <nav className={clsx(className, styles.navigation)}>
        <ControlChip
          label="О проекте"
          iconVariant="Chevron"
          isOpen={isProjectOpen}
          onClick={handleProjectClick}
        />
        <ControlChip
          label="Все навыки"
          iconVariant="Chevron"
          isOpen={isSkillOpen}
          onClick={handleSlillClick}
        />
      </nav>
      <Dropdown isOpen={isSkillOpen}>
        <span>skils</span>
      </Dropdown>
      <Dropdown isOpen={isProjectOpen}>
        <span>about</span>
      </Dropdown>
    </>
  );
};
