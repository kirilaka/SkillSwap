import type { SwapRequest } from '@/shared/types';

const REQUESTS_KEY = 'SwapRequest';

export const getRequestsFromStorage = (): SwapRequest[] => {
  try {
    const item = localStorage.getItem(REQUESTS_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
};

export const saveRequestsToStorage = (requests: SwapRequest[]) => {
  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  } catch {
    console.error('Failed to save SwapRequest to localStorage');
  }
};

export const clearRequestsStorage = () => {
  try {
    localStorage.removeItem(REQUESTS_KEY);
  } catch {
    console.error('Failed to clear SwapRequest from localStorage');
  }
};
