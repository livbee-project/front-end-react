import { useCallback, useEffect, useState } from 'react';
import type {
  ChatMessage,
  ChatRoomDetail,
  SendChatMessageRequest,
  ChatRole,
} from '@/domain/entities/Chat';
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

  const appendMessage = useCallback((message: ChatMessage) => {
    setState((prev) => {
      if (!prev.detail) return prev;
      const exists = prev.detail.messages.some((item) => item.id === message.id);
      const messages = exists
        ? prev.detail.messages.map((item) => (item.id === message.id ? message : item))
        : [...prev.detail.messages, message];
      return {
        ...prev,
        detail: {
          ...prev.detail,
          room: {
            ...prev.detail.room,
            lastMessage: message,
            updatedAt: message.createdAt,
            unreadCount:
              message.senderId === prev.detail.room.me.userId
                ? prev.detail.room.unreadCount
                : prev.detail.room.unreadCount + 1,
          },
          messages,
        },
      };
    });
  }, []);

  const updateReadStatus = useCallback((payload: { userId: string; lastMessageId: string }) => {
    setState((prev) => {
      if (!prev.detail) return prev;
      const isMe = payload.userId === prev.detail.room.me.userId;
      const nextRoom = { ...prev.detail.room };

      if (isMe) {
        nextRoom.me = {
          ...nextRoom.me,
          lastReadMessageId: payload.lastMessageId,
          lastReadAt: new Date().toISOString(),
        };
        nextRoom.unreadCount = 0;
      } else {
        const resolveRole = (): ChatRole => {
          if (payload.userId === nextRoom.brandUser?.id) return 'brand';
          if (payload.userId === nextRoom.showhostUser?.id) return 'showhost';
          return nextRoom.counterpart?.role || 'brand';
        };

        nextRoom.counterpart = {
          ...(nextRoom.counterpart || { userId: payload.userId, role: resolveRole() }),
          lastReadMessageId: payload.lastMessageId,
          lastReadAt: new Date().toISOString(),
        };
      }

      return {
        ...prev,
        detail: {
          ...prev.detail,
          room: nextRoom,
        },
      };
    });
  }, []);

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
    appendMessage,
    updateReadStatus,
  };
};

