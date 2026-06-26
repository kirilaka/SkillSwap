import { getAuthUser } from '@/features/auth/model/authUtils';
import type { User } from './types';

export function getUser(): User | null {
  const authUser = getAuthUser();

  if (!authUser) return null;

  return {
    id: authUser.id,
    name: authUser.name,
    email: authUser.email,
    avatarUrl: null,
    createdAt: new Date().toISOString(),
  };
}
