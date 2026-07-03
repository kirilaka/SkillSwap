// unit test
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import requestsReducer, {
  createRequest,
  acceptRequest,
  rejectRequest,
  startRequest,
  finishRequest,
  removeRequest,
  clearRequests,
  clearRequestsError,
  selectRequests,
  selectRequestsLoading,
  selectRequestsError,
  selectRequestById,
  selectRequestsByUserId,
  selectIncomingRequestsByUserId,
  selectOutgoingRequestsByUserId,
  selectRequestsBySkillId,
  selectHasActiveRequest,
} from './requestsSlice';
import * as storage from '@/shared/lib/localStorage/requestsStorage';
import type { SwapRequest } from '@/shared/types';

vi.mock('@/shared/lib/localStorage/requestsStorage', () => ({
  getRequestsFromStorage: vi.fn(() => []),
  saveRequestsToStorage: vi.fn(),
  clearRequestsStorage: vi.fn(),
}));

const mockRequest: SwapRequest = {
  id: 'request-1',
  skillId: 'skill-1',
  fromUserId: 'user-1',
  toUserId: 'user-2',
  status: 'pending',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  finishedAt: null,
};

const mockRequestAccepted: SwapRequest = {
  ...mockRequest,
  id: 'request-2',
  status: 'accepted',
};

const mockRequestInProgress: SwapRequest = {
  ...mockRequest,
  id: 'request-3',
  status: 'inProgress',
};

const mockRequestDone: SwapRequest = {
  ...mockRequest,
  id: 'request-4',
  status: 'done',
};

const createTestStore = (preloadedState?: {
  requests: { items: SwapRequest[]; isLoading: boolean; error: string | null };
}) =>
  configureStore({
    reducer: { requests: requestsReducer },
    preloadedState,
  });

type TestStore = ReturnType<typeof createTestStore>;

describe('requestsSlice', () => {
  let store: TestStore;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
  });

  describe('initial state', () => {
    it('should have correct initial state when localStorage empty', () => {
      expect(selectRequests(store.getState())).toEqual([]);
      expect(selectRequestsLoading(store.getState())).toBe(false);
      expect(selectRequestsError(store.getState())).toBeNull();
    });

    it('should load requests from preloaded state', () => {
      store = createTestStore({
        requests: { items: [mockRequest], isLoading: false, error: null },
      });
      expect(selectRequests(store.getState())).toHaveLength(1);
      expect(selectRequests(store.getState())[0].id).toBe('request-1');
    });
  });

  describe('createRequest', () => {
    it('should create new request', () => {
      store.dispatch(
        createRequest({
          skillId: 'skill-1',
          fromUserId: 'user-1',
          toUserId: 'user-2',
        }),
      );

      const requests = selectRequests(store.getState());
      expect(requests).toHaveLength(1);
      expect(requests[0].skillId).toBe('skill-1');
      expect(requests[0].fromUserId).toBe('user-1');
      expect(requests[0].toUserId).toBe('user-2');
      expect(requests[0].status).toBe('pending');
      expect(requests[0].id).toMatch(/^request-/);
      expect(requests[0].createdAt).toBeDefined();
      expect(requests[0].updatedAt).toBeDefined();
      expect(requests[0].finishedAt).toBeNull();
      expect(storage.saveRequestsToStorage).toHaveBeenCalled();
    });

    it('should prevent duplicate active request', () => {
      store.dispatch(
        createRequest({
          skillId: 'skill-1',
          fromUserId: 'user-1',
          toUserId: 'user-2',
        }),
      );

      store.dispatch(
        createRequest({
          skillId: 'skill-1',
          fromUserId: 'user-1',
          toUserId: 'user-2',
        }),
      );

      expect(selectRequests(store.getState())).toHaveLength(1);
    });

    it('should allow new request when previous is done (not active)', () => {
      store = createTestStore({
        requests: { items: [mockRequestDone], isLoading: false, error: null },
      });

      store.dispatch(
        createRequest({
          skillId: 'skill-1',
          fromUserId: 'user-1',
          toUserId: 'user-2',
        }),
      );

      expect(selectRequests(store.getState())).toHaveLength(2);
      expect(storage.saveRequestsToStorage).toHaveBeenCalled();
    });
  });

  describe('acceptRequest', () => {
    it('should accept pending request', () => {
      store = createTestStore({
        requests: { items: [mockRequest], isLoading: false, error: null },
      });

      store.dispatch(acceptRequest('request-1'));

      const request = selectRequestById('request-1')(store.getState());
      expect(request?.status).toBe('accepted');
      expect(request?.updatedAt).not.toBe(mockRequest.updatedAt);
      expect(storage.saveRequestsToStorage).toHaveBeenCalled();
    });

    it('should not accept non-pending request', () => {
      store = createTestStore({
        requests: { items: [mockRequestAccepted], isLoading: false, error: null },
      });

      store.dispatch(acceptRequest('request-2'));

      const request = selectRequestById('request-2')(store.getState());
      expect(request?.status).toBe('accepted');
    });

    it('should not accept non-existent request', () => {
      store.dispatch(acceptRequest('non-existent'));
      expect(selectRequests(store.getState())).toHaveLength(0);
    });
  });

  describe('rejectRequest', () => {
    it('should reject pending request', () => {
      store = createTestStore({
        requests: { items: [mockRequest], isLoading: false, error: null },
      });

      store.dispatch(rejectRequest('request-1'));

      const request = selectRequestById('request-1')(store.getState());
      expect(request?.status).toBe('rejected');
      expect(storage.saveRequestsToStorage).toHaveBeenCalled();
    });

    it('should not reject non-pending request', () => {
      store = createTestStore({
        requests: { items: [mockRequestAccepted], isLoading: false, error: null },
      });

      store.dispatch(rejectRequest('request-2'));

      const request = selectRequestById('request-2')(store.getState());
      expect(request?.status).toBe('accepted');
    });
  });

  describe('startRequest', () => {
    it('should start accepted request', () => {
      store = createTestStore({
        requests: { items: [mockRequestAccepted], isLoading: false, error: null },
      });

      store.dispatch(startRequest('request-2'));

      const request = selectRequestById('request-2')(store.getState());
      expect(request?.status).toBe('inProgress');
      expect(storage.saveRequestsToStorage).toHaveBeenCalled();
    });

    it('should not start non-accepted request', () => {
      store = createTestStore({
        requests: { items: [mockRequest], isLoading: false, error: null },
      });

      store.dispatch(startRequest('request-1'));

      const request = selectRequestById('request-1')(store.getState());
      expect(request?.status).toBe('pending');
    });
  });

  describe('finishRequest', () => {
    it('should finish accepted request', () => {
      store = createTestStore({
        requests: { items: [mockRequestAccepted], isLoading: false, error: null },
      });

      store.dispatch(finishRequest('request-2'));

      const request = selectRequestById('request-2')(store.getState());
      expect(request?.status).toBe('done');
      expect(request?.finishedAt).not.toBeNull();
      expect(storage.saveRequestsToStorage).toHaveBeenCalled();
    });

    it('should finish inProgress request', () => {
      store = createTestStore({
        requests: { items: [mockRequestInProgress], isLoading: false, error: null },
      });

      store.dispatch(finishRequest('request-3'));

      const request = selectRequestById('request-3')(store.getState());
      expect(request?.status).toBe('done');
      expect(request?.finishedAt).not.toBeNull();
      expect(storage.saveRequestsToStorage).toHaveBeenCalled();
    });

    it('should not finish pending request', () => {
      store = createTestStore({
        requests: { items: [mockRequest], isLoading: false, error: null },
      });

      store.dispatch(finishRequest('request-1'));

      const request = selectRequestById('request-1')(store.getState());
      expect(request?.status).toBe('pending');
    });

    it('should not finish done request', () => {
      store = createTestStore({
        requests: { items: [mockRequestDone], isLoading: false, error: null },
      });

      const originalUpdatedAt = mockRequestDone.updatedAt;

      store.dispatch(finishRequest('request-4'));

      const request = selectRequestById('request-4')(store.getState());
      expect(request?.status).toBe('done');
      expect(request?.updatedAt).toBe(originalUpdatedAt);
    });
  });

  describe('removeRequest', () => {
    it('should remove request by id', () => {
      store = createTestStore({
        requests: { items: [mockRequest, mockRequestAccepted], isLoading: false, error: null },
      });

      store.dispatch(removeRequest('request-1'));

      expect(selectRequests(store.getState())).toHaveLength(1);
      expect(selectRequestById('request-1')(store.getState())).toBeUndefined();
      expect(storage.saveRequestsToStorage).toHaveBeenCalled();
    });
  });

  describe('clearRequests', () => {
    it('should clear all requests and storage', () => {
      store = createTestStore({
        requests: { items: [mockRequest], isLoading: false, error: null },
      });

      store.dispatch(clearRequests());

      expect(selectRequests(store.getState())).toHaveLength(0);
      expect(storage.clearRequestsStorage).toHaveBeenCalled();
    });
  });

  describe('clearRequestsError', () => {
    it('should clear error', () => {
      store = createTestStore({
        requests: { items: [], isLoading: false, error: 'Some error' },
      });

      store.dispatch(clearRequestsError());

      expect(selectRequestsError(store.getState())).toBeNull();
    });
  });

  describe('selectors', () => {
    beforeEach(() => {
      store = createTestStore({
        requests: {
          items: [
            mockRequest,
            { ...mockRequest, id: 'request-5', fromUserId: 'user-2', toUserId: 'user-1' },
            { ...mockRequest, id: 'request-6', fromUserId: 'user-3', skillId: 'skill-2' },
            mockRequestDone,
          ],
          isLoading: false,
          error: null,
        },
      });
    });

    it('selectRequests should return all requests', () => {
      expect(selectRequests(store.getState())).toHaveLength(4);
    });

    it('selectRequestById should find request by id', () => {
      expect(selectRequestById('request-1')(store.getState())?.id).toBe('request-1');
      expect(selectRequestById('non-existent')(store.getState())).toBeUndefined();
    });

    it('selectRequestsByUserId should filter by from or to user', () => {
      const user1Requests = selectRequestsByUserId('user-1')(store.getState());
      expect(user1Requests).toHaveLength(3);
    });

    it('selectIncomingRequestsByUserId should filter by toUserId', () => {
      const incoming = selectIncomingRequestsByUserId('user-1')(store.getState());
      expect(incoming).toHaveLength(1);
      expect(incoming[0].id).toBe('request-5');
    });

    it('selectOutgoingRequestsByUserId should filter by fromUserId', () => {
      const outgoing = selectOutgoingRequestsByUserId('user-1')(store.getState());
      expect(outgoing).toHaveLength(2);
    });

    it('selectRequestsBySkillId should filter by skillId', () => {
      const skillRequests = selectRequestsBySkillId('skill-1')(store.getState());
      expect(skillRequests).toHaveLength(3);
    });

    it('selectHasActiveRequest should return true for active request', () => {
      expect(selectHasActiveRequest('user-1', 'skill-1')(store.getState())).toBe(true);
    });

    it('selectHasActiveRequest should return false when only done exists', () => {
      store = createTestStore({
        requests: { items: [mockRequestDone], isLoading: false, error: null },
      });
      expect(selectHasActiveRequest('user-1', 'skill-1')(store.getState())).toBe(false);
    });

    it('selectHasActiveRequest should return false for non-existent skill', () => {
      expect(selectHasActiveRequest('user-1', 'skill-999')(store.getState())).toBe(false);
    });
  });
});
