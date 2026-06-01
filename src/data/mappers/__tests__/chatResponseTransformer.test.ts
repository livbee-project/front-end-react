import { describe, it, expect } from 'vitest';
import { transformChatRoomDetailResponse, transformSendMessageResponse } from '@/data/mappers/ChatMapper';

describe('chatResponseTransformer', () => {
  it('transforms chat room detail from nested data', () => {
    const result = transformChatRoomDetailResponse({
      data: {
        room: { roomId: 'room-1', updatedAt: '', unreadCount: 0, me: { userId: 'me', role: 'brand' } },
        application: { applicationId: 'app-1', status: 'pending' },
        items: [{ id: 'msg-1', roomId: 'room-1', senderId: 'me', messageType: 'text', content: 'hi', createdAt: '' }],
        pagination: { hasMore: false },
      },
    });

    expect(result.messages).toHaveLength(1);
    expect(result.application?.applicationId).toBe('app-1');
    expect(result.pagination?.hasMore).toBe(false);
  });

  it('accepts already unwrapped data payload', () => {
    const result = transformChatRoomDetailResponse({
      room: { roomId: 'room-2', updatedAt: '', unreadCount: 0, me: { userId: 'me', role: 'brand' } },
      messages: [],
    });
    expect(result.room.roomId).toBe('room-2');
  });

  it('transforms send message response with nested data', () => {
    const output = transformSendMessageResponse({
      data: {
        data: {
          message: { id: 'msg', roomId: 'room', senderId: 'me', messageType: 'text', content: 'hello', createdAt: '' },
        },
      },
    });

    expect(output.message.content).toBe('hello');
  });

  it('transforms send message response with direct message payload', () => {
    const output = transformSendMessageResponse({
      id: 'msg2',
      roomId: 'room',
      senderId: 'me',
      messageType: 'text',
      content: 'world',
      createdAt: '',
    });

    expect(output.message.id).toBe('msg2');
  });
});

