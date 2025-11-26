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

type RawRoomsResponse =
  | ChatRoomSummary[]
  | {
      rooms?: ChatRoomSummary[];
      items?: ChatRoomSummary[];
      list?: ChatRoomSummary[];
      data?: ChatRoomSummary[] | { rooms?: ChatRoomSummary[]; items?: ChatRoomSummary[]; list?: ChatRoomSummary[] };
    };

const extractRooms = (payload: RawRoomsResponse): ChatRoomSummary[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.rooms)) {
    return payload.rooms;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.list)) {
    return payload.list;
  }

  if (payload.data) {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }

    if (Array.isArray(payload.data.rooms)) {
      return payload.data.rooms;
    }

    if (Array.isArray(payload.data.items)) {
      return payload.data.items;
    }

    if (Array.isArray(payload.data.list)) {
      return payload.data.list;
    }
  }

  return [];
};

export class ChatApiSource {
  async getRooms(params?: { page?: number; size?: number }): Promise<ChatRoomSummary[]> {
    const url = buildApiUrl('/chat/rooms', params);
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    // 디버깅: 원본 응답 확인
    if (process.env.NODE_ENV === 'development') {
      const responseClone = response.clone();
      responseClone.json().then((data) => {
        console.log('[ChatApiSource] getRooms 원본 응답:', data);
      }).catch(() => {});
    }
    
    const payload = await handleResponse<RawRoomsResponse>(response);
    const rooms = extractRooms(payload);
    
    // 디버깅: 추출된 채팅방 목록 확인
    if (process.env.NODE_ENV === 'development') {
      console.log('[ChatApiSource] getRooms 추출된 채팅방 목록:', rooms);
    }
    
    return rooms;
  }

  async getRoomDetail(roomId: string, params?: { page?: number; limit?: number; cursor?: string }): Promise<ChatRoomDetail> {
    const url = buildApiUrl(`/chat/rooms/${roomId}`, params);
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    // 원본 응답을 먼저 파싱
    const rawResponse = await response.json();
    
    // 디버깅: 원본 응답 확인
    if (process.env.NODE_ENV === 'development') {
      console.log('[ChatApiSource] getRoomDetail 원본 응답:', JSON.stringify(rawResponse, null, 2));
      console.log('[ChatApiSource] getRoomDetail 원본 응답 data:', rawResponse.data);
      console.log('[ChatApiSource] getRoomDetail 원본 응답 data.items:', rawResponse.data?.items);
      console.log('[ChatApiSource] getRoomDetail 원본 응답 data.messages:', rawResponse.data?.messages);
    }
    
    if (!response.ok) {
      const error = rawResponse as ApiErrorResponse;
      throw new Error(error.userMessage || error.message || '채팅방을 불러오지 못했습니다.');
    }
    
    // 백엔드 응답 형식 처리
    if (rawResponse && typeof rawResponse === 'object' && 'data' in rawResponse) {
      const data = rawResponse.data;
      
      // 백엔드 응답 형식: { ok: true, data: { room: {...}, items: [...], pagination: {...} } }
      // 프론트엔드 기대 형식: { room: {...}, messages: [...], pagination: {...} }
      if (data && typeof data === 'object' && 'room' in data) {
        // items를 messages로 변환
        const messages = Array.isArray(data.items) ? data.items : (Array.isArray(data.messages) ? data.messages : []);
        
        const result: ChatRoomDetail = {
          room: data.room,
          messages: messages,
        };
        
        // pagination이 있으면 추가
        if (data.pagination) {
          result.pagination = {
            hasMore: data.pagination.hasMore ?? (data.pagination.page < data.pagination.total / data.pagination.limit),
            nextCursor: data.pagination.nextCursor,
          };
        }
        
        return result;
      }
    }
    
    // 예상치 못한 형식
    console.error('[ChatApiSource] getRoomDetail 예상치 못한 응답 형식:', JSON.stringify(rawResponse, null, 2));
    throw new Error('채팅방 정보 응답 형식이 올바르지 않습니다.');
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
    
    // 원본 응답을 먼저 파싱
    const rawResponse = await response.json();
    
    // 디버깅: 원본 응답 확인
    if (process.env.NODE_ENV === 'development') {
      console.log('[ChatApiSource] sendMessage 원본 응답:', JSON.stringify(rawResponse, null, 2));
      console.log('[ChatApiSource] sendMessage 원본 응답 data:', rawResponse.data);
      console.log('[ChatApiSource] sendMessage 원본 응답 data.data:', rawResponse.data?.data);
      console.log('[ChatApiSource] sendMessage 원본 응답 data.data.message:', rawResponse.data?.data?.message);
    }
    
    // 백엔드 응답 형식: { ok: true, data: { message: ChatMessage } }
    // 또는 { ok: true, data: ChatMessage } (이전 형식)
    if (!response.ok) {
      const error = rawResponse as ApiErrorResponse;
      throw new Error(error.userMessage || error.message || '메시지 전송에 실패했습니다.');
    }
    
    // 응답 형식에 따라 처리
    if (rawResponse && typeof rawResponse === 'object' && 'data' in rawResponse) {
      const data = rawResponse.data;
      
      // 형식 1: { ok: true, data: { data: { message: ChatMessage } } } (중첩된 data)
      if (data && typeof data === 'object' && 'data' in data) {
        const innerData = data.data;
        if (innerData && typeof innerData === 'object' && 'message' in innerData) {
          return { message: innerData.message };
        }
        // 중첩된 data 안에 직접 ChatMessage가 있는 경우
        if (innerData && typeof innerData === 'object' && 'id' in innerData && 'content' in innerData) {
          return { message: innerData };
        }
      }
      
      // 형식 2: { ok: true, data: { message: ChatMessage } }
      if (data && typeof data === 'object' && 'message' in data) {
        return { message: data.message };
      }
      
      // 형식 3: { ok: true, data: ChatMessage } (이전 형식 호환)
      if (data && typeof data === 'object' && 'id' in data && 'content' in data) {
        return { message: data };
      }
    }
    
    // 예상치 못한 형식
    console.error('[ChatApiSource] sendMessage 예상치 못한 응답 형식:', JSON.stringify(rawResponse, null, 2));
    throw new Error('메시지 전송 응답 형식이 올바르지 않습니다.');
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

