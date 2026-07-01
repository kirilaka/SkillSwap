import type { Skill } from '@/shared/types';

const CREATED_SKILLS_KEY = 'createdSkills';

export const getCreatedSkillsFromStorage = (): Skill[] => {
  try {
    const item = localStorage.getItem(CREATED_SKILLS_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
};

export const saveCreatedSkillsToStorage = (skills: Skill[]) => {
  try {
    localStorage.setItem(CREATED_SKILLS_KEY, JSON.stringify(skills));
  } catch {
    console.error('Failed to save createdSkills to localStorage');
  }
};

export const clearCreatedSkillsStorage = () => {
  try {
    localStorage.removeItem(CREATED_SKILLS_KEY);
  } catch {
    console.error('Failed to clear createdSkills from localStorage');
  }
};
