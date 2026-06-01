/**
 * Chat API 응답 변환 Mapper
 * Clean Architecture: Data Layer - Mapper
 */

import type { ChatRoomDetail, ChatRoomSummary, SendChatMessageResponse } from '@/domain/entities/Chat';
import { error as logError } from '@/shared/utils/logger';

/**
 * roomId 필드명 오타를 포함할 수 있는 Room 객체 타입
 */
type RoomWithTypo =
  | (ChatRoomSummary & {
      roomld?: string;
      room_id?: string;
    })
  | ({
      roomId?: string;
      roomld?: string;
      room_id?: string;
      [key: string]: unknown;
    } & Partial<ChatRoomSummary>);

/**
 * Room 객체의 필드명을 정규화 (roomld 오타 대비)
 */
export const normalizeRoom = (room: RoomWithTypo): ChatRoomSummary => {
  const candidate = room as RoomWithTypo & {
    roomId?: string;
    roomld?: string;
    room_id?: string;
  };

  if (!candidate.roomId) {
    const fallbackId = candidate.roomld || candidate.room_id;
    if (fallbackId) {
      return {
        ...(candidate as Record<string, unknown>),
        roomId: fallbackId,
      } as ChatRoomSummary;
    }
  }

  return candidate as ChatRoomSummary;
};

/**
 * RawRoomsResponse 타입
 */
type RawRoomsResponse =
  | RoomWithTypo[]
  | {
      rooms?: RoomWithTypo[];
      items?: RoomWithTypo[];
      list?: RoomWithTypo[];
      data?: RoomWithTypo[] | { rooms?: RoomWithTypo[]; items?: RoomWithTypo[]; list?: RoomWithTypo[] };
    };

/**
 * 다양한 형식의 응답에서 채팅방 목록 추출
 */
export const extractRooms = (payload: RawRoomsResponse): ChatRoomSummary[] => {
  const collectRooms = (): RoomWithTypo[] => {
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
  
  const rooms = collectRooms();

  // 각 room 객체의 필드명 정규화
  return rooms.map(normalizeRoom);
};

/**
 * ChatRoomDetail 응답을 변환
 */
export const transformChatRoomDetailResponse = (
  rawResponse: unknown
): ChatRoomDetail => {
  const unwrapData = (input: unknown): unknown => {
    if (input && typeof input === 'object' && 'data' in input) {
      return (input as { data: unknown }).data;
    }
    return input;
  };

  const data = unwrapData(rawResponse);

  // 백엔드 응답 형식: { room: {...}, application: {...}, items: [...], pagination: {...} }
  if (data && typeof data === 'object' && 'room' in data) {
    const roomData = data as {
      room: unknown;
      application?: unknown;
      items?: unknown[];
      messages?: unknown[];
      pagination?: unknown;
    };
    
    // items를 messages로 변환
    const messages = Array.isArray(roomData.items) 
      ? roomData.items 
      : (Array.isArray(roomData.messages) ? roomData.messages : []);
    
    const result: ChatRoomDetail = {
      room: roomData.room as ChatRoomDetail['room'],
      messages: messages as ChatRoomDetail['messages'],
    };
    
    // application 필드가 있으면 추가
    if (roomData.application && typeof roomData.application === 'object') {
      const app = roomData.application as Record<string, unknown>;
      result.application = {
        applicationId: (app.applicationId as string) || '',
        campaignTitle: (app.campaignTitle as string) || null,
        portfolioTitle: (app.portfolioTitle as string) || null,
        availableDate:
          (app.availableDate as string) ||
          (app.available_date as string) ||
          null,
        availableTime:
          (app.availableTime as string) ||
          (app.available_time as string) ||
          null,
        message: (app.message as string) || null,
        status: (app.status as 'pending' | 'accepted' | 'rejected') || 'pending',
        createdAt: (app.createdAt as string) ?? undefined, // 백엔드에서 제공하는 경우에만 사용 (null 체크)
      };
    }
    
    // pagination이 있으면 추가
    if (roomData.pagination && typeof roomData.pagination === 'object') {
      const pagination = roomData.pagination as Record<string, unknown>;
      result.pagination = {
        hasMore: (pagination.hasMore as boolean) ?? 
          ((pagination.page as number) < (pagination.total as number) / (pagination.limit as number)),
        nextCursor: (pagination.nextCursor as string) || undefined,
      };
    }
    
    return result;
  }
  
  // 예상치 못한 형식
  logError('chatResponseTransformer', 'getRoomDetail 예상치 못한 응답 형식:', rawResponse);
  throw new Error('채팅방 정보 응답 형식이 올바르지 않습니다.');
};

/**
 * SendChatMessage 응답을 변환
 */
export const transformSendMessageResponse = (
  rawResponse: unknown
): SendChatMessageResponse => {
  const unwrapData = (input: unknown): unknown => {
    if (input && typeof input === 'object' && 'data' in input) {
      return (input as { data: unknown }).data;
    }
    return input;
  };

  const data = unwrapData(rawResponse);
  
  // 형식 1: { data: { message: ChatMessage } }
  if (data && typeof data === 'object' && 'message' in data) {
    return { message: (data as { message: unknown }).message as SendChatMessageResponse['message'] };
  }

  // 형식 2: { data: { data: { message: ChatMessage } } } 혹은 중첩
  if (data && typeof data === 'object' && 'data' in data) {
    const nested = unwrapData(data);
    if (nested && typeof nested === 'object' && 'message' in nested) {
      return { message: (nested as { message: unknown }).message as SendChatMessageResponse['message'] };
    }
    if (nested && typeof nested === 'object' && 'id' in nested && 'content' in nested) {
      return { message: nested as SendChatMessageResponse['message'] };
    }
  }

  // 형식 3: { id, content } 직접 반환
  if (data && typeof data === 'object' && 'id' in data && 'content' in data) {
    return { message: data as SendChatMessageResponse['message'] };
  }
  
  // 예상치 못한 형식
  logError('chatResponseTransformer', 'sendMessage 예상치 못한 응답 형식:', rawResponse);
  throw new Error('메시지 전송 응답 형식이 올바르지 않습니다.');
};

