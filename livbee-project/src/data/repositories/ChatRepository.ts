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
import { BaseRepository } from '@/data/repositories/BaseRepository';

export class ChatRepository extends BaseRepository {
  private apiSource: IChatApiSource;

  constructor(apiSource?: IChatApiSource) {
    super();
    // 의존성 주입: apiSource가 제공되지 않으면 기본 구현 사용
    this.apiSource = apiSource ?? new ChatApiSource();
  }

  async getRooms(params?: { page?: number; size?: number }): Promise<ChatRoomSummary[]> {
    return this.handleError(
      () => this.apiSource.getRooms(params),
      'ChatRepository',
      '채팅방 목록 조회'
    );
  }

  async getRoomDetail(
    roomId: string,
    params?: { page?: number; limit?: number; cursor?: string }
  ): Promise<ChatRoomDetail> {
    return this.handleError(
      () => this.apiSource.getRoomDetail(roomId, params),
      'ChatRepository',
      '채팅방 상세 조회'
    );
  }

  async createRoom(payload: CreateChatRoomRequest): Promise<CreateChatRoomResponse> {
    return this.handleError(
      () => this.apiSource.createRoom(payload),
      'ChatRepository',
      '채팅방 생성'
    );
  }

  async sendMessage(roomId: string, payload: SendChatMessageRequest): Promise<SendChatMessageResponse> {
    return this.handleError(
      () => this.apiSource.sendMessage(roomId, payload),
      'ChatRepository',
      '메시지 전송'
    );
  }

  async markAsRead(roomId: string, payload: ReadChatMessageRequest): Promise<{ success: boolean }> {
    return this.handleError(
      () => this.apiSource.markAsRead(roomId, payload),
      'ChatRepository',
      '메시지 읽음 처리'
    );
  }

  async deleteRoom(roomId: string): Promise<{ success: boolean }> {
    return this.handleError(
      () => this.apiSource.deleteRoom(roomId),
      'ChatRepository',
      '채팅방 삭제'
    );
  }
}

