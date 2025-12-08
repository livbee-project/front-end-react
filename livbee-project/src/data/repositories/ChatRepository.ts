import type {
  ChatRoomSummary,
  ChatRoomDetail,
  CreateChatRoomRequest,
  CreateChatRoomResponse,
  SendChatMessageRequest,
  SendChatMessageResponse,
  ReadChatMessageRequest,
} from '@/domain/entities/Chat';
import type { IChatApiSource } from '@/data/sources/interfaces/IChatApiSource';
import { ChatApiSource } from '@/data/sources/ChatApiSource';
import { error as logError } from '@/shared/utils/logger';

export class ChatRepository {
  private apiSource: IChatApiSource;

  constructor(apiSource?: IChatApiSource) {
    // 의존성 주입: apiSource가 제공되지 않으면 기본 구현 사용
    this.apiSource = apiSource ?? new ChatApiSource();
  }

  async getRooms(params?: { page?: number; size?: number }): Promise<ChatRoomSummary[]> {
    try {
      return await this.apiSource.getRooms(params);
    } catch (error) {
      logError('ChatRepository', '채팅방 목록 조회 실패:', error);
      throw error;
    }
  }

  async getRoomDetail(
    roomId: string,
    params?: { page?: number; limit?: number; cursor?: string }
  ): Promise<ChatRoomDetail> {
    try {
      return await this.apiSource.getRoomDetail(roomId, params);
    } catch (error) {
      logError('ChatRepository', '채팅방 상세 조회 실패:', error);
      throw error;
    }
  }

  async createRoom(payload: CreateChatRoomRequest): Promise<CreateChatRoomResponse> {
    try {
      return await this.apiSource.createRoom(payload);
    } catch (error) {
      logError('ChatRepository', '채팅방 생성 실패:', error);
      throw error;
    }
  }

  async sendMessage(roomId: string, payload: SendChatMessageRequest): Promise<SendChatMessageResponse> {
    try {
      return await this.apiSource.sendMessage(roomId, payload);
    } catch (error) {
      logError('ChatRepository', '메시지 전송 실패:', error);
      throw error;
    }
  }

  async markAsRead(roomId: string, payload: ReadChatMessageRequest): Promise<{ success: boolean }> {
    try {
      return await this.apiSource.markAsRead(roomId, payload);
    } catch (error) {
      logError('ChatRepository', '메시지 읽음 처리 실패:', error);
      throw error;
    }
  }

  async deleteRoom(roomId: string): Promise<{ success: boolean }> {
    try {
      return await this.apiSource.deleteRoom(roomId);
    } catch (error) {
      logError('ChatRepository', '채팅방 삭제 실패:', error);
      throw error;
    }
  }
}

