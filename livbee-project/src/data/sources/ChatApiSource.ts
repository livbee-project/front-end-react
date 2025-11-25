import {
  buildApiUrl,
  getAuthHeaders,
} from '@/shared/config/apiConfig';
import type {
  ChatRoomSummary,
  ChatRoomDetail,
  CreateChatRoomRequest,
  CreateChatRoomResponse,
  SendChatMessageRequest,
  SendChatMessageResponse,
  ReadChatMessageRequest,
} from '@/domain/entities/Chat';

interface ApiSuccessResponse<T> {
  ok?: boolean;
  success?: boolean;
  data: T;
}

interface ApiErrorResponse {
  message?: string;
  userMessage?: string;
  error?: string;
  code?: string;
}

const isSuccess = <T>(result: any): result is ApiSuccessResponse<T> =>
  Boolean(result && typeof result === 'object' && (result.ok || result.success) && 'data' in result);

const handleResponse = async <T>(response: Response): Promise<T> => {
  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    if (!response.ok) {
      throw new Error(`요청에 실패했습니다. (${response.status})`);
    }
    throw new Error('예상치 못한 응답 형식입니다.');
  }

  if (!response.ok) {
    const error = payload as ApiErrorResponse;
    throw new Error(error.userMessage || error.message || '요청을 처리하지 못했습니다.');
  }

  if (isSuccess<T>(payload)) {
    return payload.data;
  }

  // 일부 API는 data 대신 바로 값을 반환할 수 있음
  return payload as T;
};

export class ChatApiSource {
  async getRooms(params?: { page?: number; size?: number }): Promise<ChatRoomSummary[]> {
    const url = buildApiUrl('/chat/rooms', params);
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<ChatRoomSummary[]>(response);
  }

  async getRoomDetail(roomId: string, params?: { page?: number; limit?: number; cursor?: string }): Promise<ChatRoomDetail> {
    const url = buildApiUrl(`/chat/rooms/${roomId}`, params);
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<ChatRoomDetail>(response);
  }

  async createRoom(payload: CreateChatRoomRequest): Promise<CreateChatRoomResponse> {
    const url = buildApiUrl('/chat/rooms');
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse<CreateChatRoomResponse>(response);
  }

  async sendMessage(roomId: string, payload: SendChatMessageRequest): Promise<SendChatMessageResponse> {
    const url = buildApiUrl(`/chat/rooms/${roomId}/messages`);
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse<SendChatMessageResponse>(response);
  }

  async markAsRead(roomId: string, payload: ReadChatMessageRequest): Promise<{ success: boolean }> {
    const url = buildApiUrl(`/chat/rooms/${roomId}/read`);
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse<{ success: boolean }>(response);
  }
}

export const chatApiSource = new ChatApiSource();

