import type { Skill } from '@/shared/types';
import { getCreatedSkillsFromStorage } from '@/shared/lib/localStorage/CreatedSkillsStorage';

const BASE_URL = '/db';

export async function fetchSkills(): Promise<Skill[]> {
  const response = await fetch(`${BASE_URL}/skills.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch skills');
  }

  return response.json();
}

export async function fetchSkillById(id: string): Promise<Skill | undefined> {
  const skillsFromJson = await fetchSkills();
  const createdSkills = getCreatedSkillsFromStorage();

  const skills = [...skillsFromJson, ...createdSkills];

  return skills.find((skill) => skill.id === id);
}
