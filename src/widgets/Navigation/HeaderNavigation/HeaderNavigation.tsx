import clsx from 'clsx';
import styles from './HeaderNavigation.module.scss';
import { ControlChip } from '@/shared/ui/ControlChip/ControlChip';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { useState } from 'react';

interface HeaderNavigationProps {
  /**Доп.классы*/
  className?: string;
}

export const HeaderNavigation = ({ className }: HeaderNavigationProps) => {
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const handleSkillClick = () => {
    setIsSkillDropdownOpen(true);
  };

  const handleProjectClick = () => {
    setIsProjectDropdownOpen(true);
  };

  const handleSkillDropdownClose = () => {
    setIsSkillDropdownOpen(false);
  };

  const handleProjectDropdownClose = () => {
    setIsProjectDropdownOpen(false);
  };

  return (
    <>
      <nav className={clsx(className)}>
        <ul className={styles.navigation}>
          <li>
            <ControlChip
              label="О проекте"
              iconVariant="Chevron"
              isOpen={isProjectDropdownOpen}
              onClick={handleProjectClick}
            />
            <Dropdown
              isOpen={isProjectDropdownOpen}
              onClose={handleProjectDropdownClose}
              className={styles.projectDropdown}
            >
              <span>about</span>
            </Dropdown>
          </li>
          <li>
            <ControlChip
              label="Все навыки"
              iconVariant="Chevron"
              isOpen={isSkillDropdownOpen}
              onClick={handleSkillClick}
            />
            <Dropdown
              isOpen={isSkillDropdownOpen}
              onClose={handleSkillDropdownClose}
              className={styles.skillsDropdown}
            >
              <span>skils</span>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </>
  );
};
