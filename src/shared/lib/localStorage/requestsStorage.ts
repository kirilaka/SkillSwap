import type { ExchangeRequest } from '@/features/requests/model/types';

const REQUESTS_KEY = 'exchangeRequests';

export const getRequestsFromStorage = (): ExchangeRequest[] => {
  try {
    const item = localStorage.getItem(REQUESTS_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
};

export const saveRequestsToStorage = (requests: ExchangeRequest[]) => {
  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  } catch {
    console.error('Failed to save exchangeRequests to localStorage');
  }
};

export const clearRequestsStorage = () => {
  try {
    localStorage.removeItem(REQUESTS_KEY);
  } catch {
    console.error('Failed to clear exchangeRequests from localStorage');
  }
};
