import { SKILL_CATEGORIES } from '../lib/constants';

// ─── Skill ───────────────────────────────────────────────
export type SkillType = 'teach' | 'learn';

export interface Skill {
  id: string;
  title: string;
  description: string;
  type: SkillType;
  category: SKILL_CATEGORIES;
  categoryId: string;
  subcategory: string;
  subcategoryId: string;
  tags: string[];
  imageUrl: string[] | null;
  authorId: string;
  createdAt: string;
  source?: 'mock' | 'created'; // ← добавить
}

// ─── User ────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
}

export type GenderType = 'male' | 'female';

export interface UserInfo extends User {
  description?: string;
  skills?: Skill[];
  gender?: GenderType;
  age?: number;
  city?: string;
}

// ─── Request ─────────────────────────────────────────────
export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'inProgress' | 'done';

export interface SwapRequest {
  id: string;
  skillId: string;
  fromUserId: string;
  toUserId: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  finishedAt?: string | null;
}

// ─── Auth ────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}
