import type {
  ChatRoomSummary,
  ChatRoomDetail,
  CreateChatRoomRequest,
  CreateChatRoomResponse,
  SendChatMessageRequest,
  SendChatMessageResponse,
  ReadChatMessageRequest,
} from '@/domain/entities/Chat';

/**
 * 채팅 API 소스 인터페이스
 */
export interface IChatApiSource {
  getRooms(params?: { page?: number; size?: number }): Promise<ChatRoomSummary[]>;
  getRoomDetail(roomId: string, params?: { page?: number; limit?: number; cursor?: string }): Promise<ChatRoomDetail>;
  createRoom(payload: CreateChatRoomRequest): Promise<CreateChatRoomResponse>;
  sendMessage(roomId: string, payload: SendChatMessageRequest): Promise<SendChatMessageResponse>;
  markAsRead(roomId: string, payload: ReadChatMessageRequest): Promise<{ success: boolean }>;
  deleteRoom(roomId: string): Promise<{ success: boolean }>;
}

