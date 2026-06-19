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
      <nav className={clsx(className)}>
        <ul className={styles.navigation}>
          <li>
            <ControlChip
              label="О проекте"
              iconVariant="Chevron"
              isOpen={isProjectOpen}
              onClick={handleProjectClick}
            />
            <Dropdown isOpen={isProjectOpen} className={styles.projectDropdown}>
              <span>about</span>
            </Dropdown>
          </li>
          <li>
            <ControlChip
              label="Все навыки"
              iconVariant="Chevron"
              isOpen={isSkillOpen}
              onClick={handleSlillClick}
            />
            <Dropdown isOpen={isSkillOpen} className={styles.skillsDropdown}>
              <span>skils</span>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </>
  );
};
