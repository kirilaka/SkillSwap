import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SwapRequest, RequestStatus } from './types';
import {
  getRequestsFromStorage,
  saveRequestsToStorage,
  clearRequestsStorage,
} from '@/shared/lib/localStorage/requestsStorage';

const ACTIVE_STATUSES: RequestStatus[] = ['pending', 'accepted', 'inProgress'];

export interface CreateRequestPayload {
  skillId: string;
  fromUserId: string;
  toUserId: string;
}

export interface RequestsState {
  items: SwapRequest[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  items: getRequestsFromStorage(),
  isLoading: false,
  error: null,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    createRequest: (state, action: PayloadAction<CreateRequestPayload>) => {
      const { skillId, fromUserId, toUserId } = action.payload;

      const hasActiveRequest = state.items.some(
        (request) =>
          request.skillId === skillId &&
          request.fromUserId === fromUserId &&
          ACTIVE_STATUSES.includes(request.status),
      );

      if (hasActiveRequest) {
        return;
      }

      const newRequest: SwapRequest = {
        id: `request-${Date.now()}`,
        skillId,
        fromUserId,
        toUserId,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        finishedAt: null,
      };

      state.items.push(newRequest);
      saveRequestsToStorage(state.items);
    },

    acceptRequest: (state, action: PayloadAction<string>) => {
      const requestId = action.payload;
      const request = state.items.find((r) => r.id === requestId);

      if (!request || request.status !== 'pending') {
        return;
      }

      request.status = 'accepted';
      request.updatedAt = new Date().toISOString();
      saveRequestsToStorage(state.items);
    },

    rejectRequest: (state, action: PayloadAction<string>) => {
      const requestId = action.payload;
      const request = state.items.find((r) => r.id === requestId);

      if (!request || request.status !== 'pending') {
        return;
      }

      request.status = 'rejected';
      request.updatedAt = new Date().toISOString();
      saveRequestsToStorage(state.items);
    },

    startRequest: (state, action: PayloadAction<string>) => {
      const requestId = action.payload;
      const request = state.items.find((r) => r.id === requestId);

      if (!request || request.status !== 'accepted') {
        return;
      }

      request.status = 'inProgress';
      request.updatedAt = new Date().toISOString();
      saveRequestsToStorage(state.items);
    },

    finishRequest: (state, action: PayloadAction<string>) => {
      const requestId = action.payload;
      const request = state.items.find((r) => r.id === requestId);

      if (!request || !['accepted', 'inProgress'].includes(request.status)) {
        return;
      }

      request.status = 'done';
      request.updatedAt = new Date().toISOString();
      request.finishedAt = new Date().toISOString();
      saveRequestsToStorage(state.items);
    },

    removeRequest: (state, action: PayloadAction<string>) => {
      const requestId = action.payload;
      state.items = state.items.filter((r) => r.id !== requestId);
      saveRequestsToStorage(state.items);
    },

    clearRequests: (state) => {
      state.items = [];
      clearRequestsStorage();
    },

    clearRequestsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  createRequest,
  acceptRequest,
  rejectRequest,
  startRequest,
  finishRequest,
  removeRequest,
  clearRequests,
  clearRequestsError,
} = requestsSlice.actions;

export default requestsSlice.reducer;

export const selectRequests = (state: { requests: RequestsState }) => state.requests.items;

export const selectRequestsLoading = (state: { requests: RequestsState }) =>
  state.requests.isLoading;

export const selectRequestsError = (state: { requests: RequestsState }) => state.requests.error;

export const selectRequestById = (id: string) => (state: { requests: RequestsState }) =>
  state.requests.items.find((r) => r.id === id);

export const selectRequestsByUserId = (userId: string) => (state: { requests: RequestsState }) =>
  state.requests.items.filter(
    (request) => request.fromUserId === userId || request.toUserId === userId,
  );

export const selectIncomingRequestsByUserId =
  (userId: string) => (state: { requests: RequestsState }) =>
    state.requests.items.filter((request) => request.toUserId === userId);

export const selectOutgoingRequestsByUserId =
  (userId: string) => (state: { requests: RequestsState }) =>
    state.requests.items.filter((request) => request.fromUserId === userId);

export const selectRequestsBySkillId = (skillId: string) => (state: { requests: RequestsState }) =>
  state.requests.items.filter((request) => request.skillId === skillId);

export const selectHasActiveRequest =
  (userId: string, skillId: string) => (state: { requests: RequestsState }) =>
    state.requests.items.some(
      (request) =>
        request.skillId === skillId &&
        request.fromUserId === userId &&
        ACTIVE_STATUSES.includes(request.status),
    );
