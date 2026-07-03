// integration test
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  createRequest,
  acceptRequest,
  rejectRequest,
  startRequest,
  finishRequest,
  removeRequest,
  clearRequests,
  clearRequestsError,
  selectRequests,
  selectRequestById,
  selectRequestsError,
  selectRequestsByUserId,
  selectIncomingRequestsByUserId,
  selectOutgoingRequestsByUserId,
  selectRequestsBySkillId,
  selectHasActiveRequest,
} from './requestsSlice';
import { renderWithProviders } from '@/shared/lib/tests/renderWithProvider';
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

const mockRequestDone: SwapRequest = {
  ...mockRequest,
  id: 'request-4',
  status: 'done',
};

// ─── Тестовые компоненты ─────────────────────────────────────────

function CreateRequestComponent() {
  const dispatch = useAppDispatch();
  const requests = useAppSelector(selectRequests);

  return (
    <div>
      <div data-testid="requests-count">{requests.length}</div>
      <button
        onClick={() =>
          dispatch(
            createRequest({
              skillId: 'skill-1',
              fromUserId: 'user-1',
              toUserId: 'user-2',
            }),
          )
        }
      >
        Create
      </button>
      <button onClick={() => dispatch(clearRequests())}>Clear</button>
    </div>
  );
}

function RequestActionsComponent() {
  const dispatch = useAppDispatch();
  const requests = useAppSelector(selectRequests);
  const firstStatus = requests[0]?.status ?? 'null';

  return (
    <div>
      <div data-testid="requests-count">{requests.length}</div>
      <div data-testid="first-status">{firstStatus}</div>
      <button onClick={() => dispatch(acceptRequest('request-1'))}>Accept</button>
      <button onClick={() => dispatch(rejectRequest('request-1'))}>Reject</button>
      <button onClick={() => dispatch(startRequest('request-1'))}>Start</button>
      <button onClick={() => dispatch(finishRequest('request-1'))}>Finish</button>
      <button onClick={() => dispatch(removeRequest('request-1'))}>Remove</button>
    </div>
  );
}

function ErrorComponent() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRequestsError);

  return (
    <div>
      <div data-testid="error">{error ?? 'null'}</div>
      <button onClick={() => dispatch(clearRequestsError())}>Clear Error</button>
    </div>
  );
}

function SelectorsComponent() {
  const requests = useAppSelector(selectRequests);
  const foundRequest = useAppSelector(selectRequestById('request-1'));
  const byUser = useAppSelector(selectRequestsByUserId('user-1'));
  const incoming = useAppSelector(selectIncomingRequestsByUserId('user-1'));
  const outgoing = useAppSelector(selectOutgoingRequestsByUserId('user-1'));
  const bySkill = useAppSelector(selectRequestsBySkillId('skill-1'));
  const hasActive = useAppSelector(selectHasActiveRequest('user-1', 'skill-1'));

  return (
    <div>
      <div data-testid="total">{requests.length}</div>
      <div data-testid="found">{foundRequest?.id ?? 'null'}</div>
      <div data-testid="by-user">{byUser.length}</div>
      <div data-testid="incoming">{incoming.length}</div>
      <div data-testid="outgoing">{outgoing.length}</div>
      <div data-testid="by-skill">{bySkill.length}</div>
      <div data-testid="has-active">{hasActive.toString()}</div>
    </div>
  );
}

// ─── Tests ─────────────────────────────────────────────────────────

describe('requestsSlice with renderWithProviders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should render empty requests', () => {
      renderWithProviders(<CreateRequestComponent />);

      expect(screen.getByTestId('requests-count')).toHaveTextContent('0');
    });
  });

  describe('createRequest', () => {
    it('should create request', async () => {
      const user = userEvent.setup();
      renderWithProviders(<CreateRequestComponent />);

      await user.click(screen.getByRole('button', { name: 'Create' }));

      expect(screen.getByTestId('requests-count')).toHaveTextContent('1');
      expect(storage.saveRequestsToStorage).toHaveBeenCalled();
    });

    it('should prevent duplicate active request', async () => {
      const user = userEvent.setup();
      renderWithProviders(<CreateRequestComponent />);

      await user.click(screen.getByRole('button', { name: 'Create' }));
      await user.click(screen.getByRole('button', { name: 'Create' }));

      expect(screen.getByTestId('requests-count')).toHaveTextContent('1');
    });
  });

  describe('acceptRequest', () => {
    it('should accept pending request', async () => {
      const user = userEvent.setup();
      renderWithProviders(<RequestActionsComponent />, {
        preloadedState: {
          requests: { items: [mockRequest], isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Accept' }));

      expect(screen.getByTestId('first-status')).toHaveTextContent('accepted');
    });
  });

  describe('rejectRequest', () => {
    it('should reject pending request', async () => {
      const user = userEvent.setup();
      renderWithProviders(<RequestActionsComponent />, {
        preloadedState: {
          requests: { items: [mockRequest], isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Reject' }));

      expect(screen.getByTestId('first-status')).toHaveTextContent('rejected');
    });
  });

  describe('startRequest', () => {
    it('should start accepted request', async () => {
      const user = userEvent.setup();
      renderWithProviders(<RequestActionsComponent />, {
        preloadedState: {
          requests: {
            items: [{ ...mockRequest, status: 'accepted' }],
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Start' }));

      expect(screen.getByTestId('first-status')).toHaveTextContent('inProgress');
    });
  });

  describe('finishRequest', () => {
    it('should finish accepted request', async () => {
      const user = userEvent.setup();
      renderWithProviders(<RequestActionsComponent />, {
        preloadedState: {
          requests: {
            items: [{ ...mockRequest, status: 'accepted' }],
            isLoading: false,
            error: null,
          },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Finish' }));

      expect(screen.getByTestId('first-status')).toHaveTextContent('done');
    });
  });

  describe('removeRequest', () => {
    it('should remove request', async () => {
      const user = userEvent.setup();
      renderWithProviders(<RequestActionsComponent />, {
        preloadedState: {
          requests: { items: [mockRequest], isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Remove' }));

      expect(screen.getByTestId('requests-count')).toHaveTextContent('0');
    });
  });

  describe('clearRequests', () => {
    it('should clear all requests', async () => {
      const user = userEvent.setup();
      renderWithProviders(<CreateRequestComponent />, {
        preloadedState: {
          requests: { items: [mockRequest], isLoading: false, error: null },
        },
      });

      await user.click(screen.getByRole('button', { name: 'Clear' }));

      expect(screen.getByTestId('requests-count')).toHaveTextContent('0');
      expect(storage.clearRequestsStorage).toHaveBeenCalled();
    });
  });

  describe('clearRequestsError', () => {
    it('should clear error', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ErrorComponent />, {
        preloadedState: {
          requests: { items: [], isLoading: false, error: 'Some error' },
        },
      });

      expect(screen.getByTestId('error')).toHaveTextContent('Some error');

      await user.click(screen.getByRole('button', { name: 'Clear Error' }));

      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });
  });

  describe('selectors', () => {
    it('should render selector results', () => {
      renderWithProviders(<SelectorsComponent />, {
        preloadedState: {
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
        },
      });

      expect(screen.getByTestId('total')).toHaveTextContent('4');
      expect(screen.getByTestId('found')).toHaveTextContent('request-1');
      expect(screen.getByTestId('by-user')).toHaveTextContent('3');
      expect(screen.getByTestId('incoming')).toHaveTextContent('1');
      expect(screen.getByTestId('outgoing')).toHaveTextContent('2');
      expect(screen.getByTestId('by-skill')).toHaveTextContent('3');
      expect(screen.getByTestId('has-active')).toHaveTextContent('true');
    });
  });
});
