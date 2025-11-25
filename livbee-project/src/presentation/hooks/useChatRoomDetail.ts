import { useCallback, useEffect, useState } from 'react';
import type { ChatMessage, ChatRoomDetail, SendChatMessageRequest } from '@/domain/entities/Chat';
import { chatApiSource } from '@/data/sources/ChatApiSource';

interface ChatRoomState {
  detail: ChatRoomDetail | null;
  loading: boolean;
  error: string | null;
}

export const useChatRoomDetail = (roomId?: string) => {
  const [state, setState] = useState<ChatRoomState>({
    detail: null,
    loading: Boolean(roomId),
    error: null,
  });

  const fetchRoom = useCallback(async () => {
    if (!roomId) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const detail = await chatApiSource.getRoomDetail(roomId);
      setState({ detail, loading: false, error: null });
    } catch (error) {
      setState({
        detail: null,
        loading: false,
        error: error instanceof Error ? error.message : '채팅방을 불러오지 못했습니다.',
      });
    }
  }, [roomId]);

  const sendMessage = useCallback(
    async (payload: SendChatMessageRequest): Promise<ChatMessage | null> => {
      if (!roomId) return null;
      try {
        const response = await chatApiSource.sendMessage(roomId, payload);
        setState((prev) => {
          if (!prev.detail) {
            return prev;
          }
          return {
            ...prev,
            detail: {
              ...prev.detail,
              room: {
                ...prev.detail.room,
                lastMessage: response.message,
                updatedAt: response.message.createdAt,
                unreadCount: prev.detail.room.unreadCount,
              },
              messages: [...prev.detail.messages, response.message],
            },
          };
        });
        return response.message;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : '메시지를 전송하지 못했습니다.'
        );
      }
    },
    [roomId]
  );

  const markAsRead = useCallback(
    async (messageId: string) => {
      if (!roomId) return;
      try {
        await chatApiSource.markAsRead(roomId, { lastMessageId: messageId });
        setState((prev) => {
          if (!prev.detail) {
            return prev;
          }
          return {
            ...prev,
            detail: {
              ...prev.detail,
              room: {
                ...prev.detail.room,
                unreadCount: 0,
                me: {
                  ...prev.detail.room.me,
                  lastReadMessageId: messageId,
                  lastReadAt: new Date().toISOString(),
                },
              },
            },
          };
        });
      } catch (error) {
        // 읽음 처리 실패는 치명적이지 않으므로 콘솔만 남김
        console.error(error);
      }
    },
    [roomId]
  );

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  return {
    roomDetail: state.detail,
    messages: state.detail?.messages ?? [],
    loading: state.loading,
    error: state.error,
    refresh: fetchRoom,
    sendMessage,
    markAsRead,
  };
};

