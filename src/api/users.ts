import type { UserInfo } from '@/shared/types';
import { getRegisteredUsers } from '@/features/auth/model/authApi';

const BASE_URL = '/db';

export async function fetchUsers(): Promise<UserInfo[]> {
  const response = await fetch(`${BASE_URL}/users.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const mockUsers: UserInfo[] = await response.json();

  const registeredUsers = getRegisteredUsers();

  const registeredUsersWithoutPassword: UserInfo[] = registeredUsers.map(
    // eslint-disable-next-line
    ({ password, ...user }) => user,
  );

  return [...mockUsers, ...registeredUsersWithoutPassword];
}

export async function fetchUserById(id: string): Promise<UserInfo | undefined> {
  const users = await fetchUsers();

  return users.find((user) => user.id === id);
}
