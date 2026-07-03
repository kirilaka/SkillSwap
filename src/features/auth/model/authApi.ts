import { UserInfo } from '@/shared/types';
//Ключи для localStorage

export const TOKEN_KEY = 'token';
export const USER_ID_KEY = 'userId';
export const REGISTERED_USERS_KEY = 'registeredUsers';

export const getRegisteredUsers = (): RegisteredUser[] => {
  const users = localStorage.getItem(REGISTERED_USERS_KEY);

  return users ? JSON.parse(users) : [];
};

export const saveRegisteredUsers = (users: UserInfo[]) => {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

export const setAuthData = (token: string, userId: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ID_KEY, userId);
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
};

// Поиск пользователя во всех источниках
export const findUserByEmail = async (email: string): Promise<UserInfo | undefined> => {
  // Ищем в users.json
  const response = await fetch('/db/users.json');

  const data: UserInfo[] = await response.json();
  const mockUser = data.find((user) => user.email === email);

  if (mockUser) {
    return mockUser;
  }

  // Ищем в зарегестрированных
  const registeredUsers = getRegisteredUsers();
  return registeredUsers.find((u) => u.email === email);
};

export type RegisteredUser = UserInfo & {
  password: string;
};

export const findRegisteredUserByEmail = (email: string): RegisteredUser | undefined => {
  const registeredUsers = getRegisteredUsers();

  return registeredUsers.find((user) => user.email === email);
};

export const findUserById = async (userId: string): Promise<UserInfo | undefined> => {
  // ищем в user.json
  const response = await fetch('/db/users.json');

  const data: UserInfo[] = await response.json();
  const mockUser = data.find((user) => user.id === userId);

  if (mockUser) {
    return mockUser;
  }

  // ищем в зарегестрированных
  const registeredUsers = getRegisteredUsers();
  return registeredUsers.find((u) => u.id === userId);
};
