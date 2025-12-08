import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { fetchApi } from '@/shared/utils/apiClient';
import { debug } from '@/shared/utils/logger';
import type {
  ChatRoomSummary,
  ChatRoomDetail,
  CreateChatRoomRequest,
  CreateChatRoomResponse,
  SendChatMessageRequest,
  SendChatMessageResponse,
  ReadChatMessageRequest,
} from '@/domain/entities/Chat';
import { extractRooms, transformChatRoomDetailResponse, transformSendMessageResponse } from '@/data/mappers/ChatMapper';

/**
 * RawRoomsResponse 타입 (extractRooms에서 사용)
 */
type RawRoomsResponse =
  | ChatRoomSummary[]
  | {
      rooms?: ChatRoomSummary[];
      items?: ChatRoomSummary[];
      list?: ChatRoomSummary[];
      data?: ChatRoomSummary[] | { rooms?: ChatRoomSummary[]; items?: ChatRoomSummary[]; list?: ChatRoomSummary[] };
    };

type ChatRoomDetailApiData = {
  room: ChatRoomDetail['room'];
  application?: ChatRoomDetail['application'];
  items?: ChatRoomDetail['messages'];
  messages?: ChatRoomDetail['messages'];
  pagination?: ChatRoomDetail['pagination'];
};

import type { IChatApiSource } from './interfaces/IChatApiSource';

export class ChatApiSource implements IChatApiSource {
  async getRooms(params?: { page?: number; size?: number }): Promise<ChatRoomSummary[]> {
    const url = buildApiUrl('/chat/rooms', params);
    
    const payload = await fetchApi<RawRoomsResponse>(
      url,
      {
        method: 'GET',
        headers: getAuthHeaders(),
      },
      '채팅방 목록 조회'
    );
    
    const rooms = extractRooms(payload);
    
    // 디버깅: 추출된 채팅방 목록 확인
    debug('ChatApiSource', 'getRooms 추출된 채팅방 목록:', rooms);
    
    return rooms;
  }

  async getRoomDetail(roomId: string, params?: { page?: number; limit?: number; cursor?: string }): Promise<ChatRoomDetail> {
    const url = buildApiUrl(`/chat/rooms/${roomId}`, params);
    const payload = await fetchApi<ChatRoomDetailApiData>(
      url,
      {
        method: 'GET',
        headers: getAuthHeaders(),
      },
      '채팅방 상세 조회'
    );
    
    debug('ChatApiSource', 'getRoomDetail 응답 데이터:', payload);
    
    return transformChatRoomDetailResponse({ data: payload });
  }

  async createRoom(payload: CreateChatRoomRequest): Promise<CreateChatRoomResponse> {
    const url = buildApiUrl('/chat/rooms');
    return fetchApi<CreateChatRoomResponse>(
      url,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      },
      '채팅방 생성'
    );
  }

  async sendMessage(roomId: string, payload: SendChatMessageRequest): Promise<SendChatMessageResponse> {
    const url = buildApiUrl(`/chat/rooms/${roomId}/messages`);
    const result = await fetchApi<unknown>(
      url,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      },
      '메시지 전송'
    );
    
    debug('ChatApiSource', 'sendMessage 응답 데이터:', result);
    
    return transformSendMessageResponse(result);
  }

  async markAsRead(roomId: string, payload: ReadChatMessageRequest): Promise<{ success: boolean }> {
    const url = buildApiUrl(`/chat/rooms/${roomId}/read`);
    return fetchApi<{ success: boolean }>(
      url,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      },
      '메시지 읽음 처리'
    );
  }

  async deleteRoom(roomId: string): Promise<{ success: boolean }> {
    const url = buildApiUrl(`/chat/rooms/${roomId}`);
    return fetchApi<{ success: boolean }>(
      url,
      {
        method: 'DELETE',
        headers: getAuthHeaders(),
      },
      '채팅방 삭제'
    );
  }
}

export const chatApiSource = new ChatApiSource();

