import clsx from 'clsx';
import styles from './HeaderNavigation.module.scss';
import { ControlChip } from '@/shared/ui/ControlChip/ControlChip';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { useState } from 'react';
import { skillsFilterList } from '@/features/filtration/models/artFilter';
import { SkillWrapper } from '@/entities/skill/ui/SkillWrapper/SkillWrapper';
import { skillCategories } from '@/pages/RegisterPage';
import { BriefcaseIcon } from '@/shared/ui/Icons/BriefcaseIcon/BriefcaseIcon';
import { PaletteIcon } from '@/shared/ui/Icons/PaletteIcon/PaletteIcon';
import { GlobalIcon } from '@/shared/ui/Icons/GlobalIcon/GlobalIcon';
import { BookIcon } from '@/shared/ui/Icons/BookIcon/BookIcon';
import { HomeIcon } from '@/shared/ui/Icons/HomeIcon/HomeIcon';
import { LifestyleIcon } from '@/shared/ui/Icons/LifestyleIcon/LifestyleIcon';
import { IdeaIcon } from '@/shared/ui/Icons/IdeaIcon/IdeaIcon';

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
              <span>Команда:</span>
              <a href="https://github.com/Groulbands" target="_blank" rel="noreferrer">
                TL - Даниил
              </a>
              <a href="https://github.com/malirue" target="_blank" rel="noreferrer">
                Зам TL - Эвелина
              </a>
              <a href="https://github.com/Kondrati3vMaksim" target="_blank" rel="noreferrer">
                Максим
              </a>
              <a href="https://github.com/ovladsmit" target="_blank" rel="noreferrer">
                Владислав
              </a>
              <a href="https://github.com/D1midron" target="_blank" rel="noreferrer">
                Дмитрий
              </a>
              <a href="https://github.com/Iluwa8" target="_blank" rel="noreferrer">
                Илья
              </a>
              <a href="https://github.com/SashkaAdidas" target="_blank" rel="noreferrer">
                Александр
              </a>
              <a href="https://github.com/dUbislav" target="_blank" rel="noreferrer">
                Sasha D.
              </a>
              <a href="https://github.com/kirill4ikkk26097456321" target="_blank" rel="noreferrer">
                Кирилл К.
              </a>
              <a href="https://github.com/Elen-ok" target="_blank" rel="noreferrer">
                Елена
              </a>
              <a href="https://github.com/kirilaka" target="_blank" rel="noreferrer">
                Кирилл Б.
              </a>
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
              {skillsFilterList.map((c, index) => {
                return (
                  <div key={index} className={styles.skillCategories}>
                    <SkillWrapper
                      className={styles.icon}
                      skillCategory={skillCategories[index]}
                      variant="icon"
                    >
                      {index == 0 ? (
                        <BriefcaseIcon />
                      ) : index == 1 ? (
                        <PaletteIcon />
                      ) : index == 2 ? (
                        <GlobalIcon />
                      ) : index == 3 ? (
                        <BookIcon />
                      ) : index == 4 ? (
                        <HomeIcon />
                      ) : index == 5 ? (
                        <LifestyleIcon />
                      ) : (
                        <IdeaIcon />
                      )}
                    </SkillWrapper>
                    <div className={styles.categoryContent}>
                      <h2>{c.label}</h2>
                      {c.subFilters?.map((sb, index) => {
                        return <span key={index}>{sb.label}</span>;
                      })}
                    </div>
                  </div>
                );
              })}
            </Dropdown>
          </li>
        </ul>
      </nav>
    </>
  );
};
