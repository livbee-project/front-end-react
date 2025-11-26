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
      
      // 디버깅: 받아온 채팅방 상세 정보 확인
      if (process.env.NODE_ENV === 'development') {
        console.log('[useChatRoomDetail] fetchRoom 받아온 detail:', detail);
        console.log('[useChatRoomDetail] fetchRoom messages:', detail?.messages);
        console.log('[useChatRoomDetail] fetchRoom messages 개수:', detail?.messages?.length);
      }
      
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
        
        // 디버깅: 응답 구조 확인
        if (process.env.NODE_ENV === 'development') {
          console.log('[useChatRoomDetail] sendMessage 응답:', response);
        }
        
        // response.message가 없는 경우 처리
        if (!response || !response.message) {
          console.error('[useChatRoomDetail] 응답에 message가 없습니다:', response);
          throw new Error('메시지 전송 응답 형식이 올바르지 않습니다.');
        }
        
        const message = response.message;
        
        setState((prev) => {
          if (!prev.detail) {
            return prev;
          }
          
          // messages가 배열인지 확인하고, 배열이 아니면 빈 배열로 초기화
          const currentMessages = Array.isArray(prev.detail.messages) 
            ? prev.detail.messages 
            : [];
          
          return {
            ...prev,
            detail: {
              ...prev.detail,
              room: {
                ...prev.detail.room,
                lastMessage: message,
                updatedAt: message.createdAt || new Date().toISOString(),
                unreadCount: prev.detail.room.unreadCount,
              },
              messages: [...currentMessages, message],
            },
          };
        });
        return message;
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
    if (!message || !message.id) {
      console.error('[useChatRoomDetail] appendMessage: 유효하지 않은 메시지:', message);
      return;
    }
    
    setState((prev) => {
      if (!prev.detail) return prev;
      
      // messages가 배열인지 확인하고, 배열이 아니면 빈 배열로 초기화
      const currentMessages = Array.isArray(prev.detail.messages) 
        ? prev.detail.messages 
        : [];
      
      const exists = currentMessages.some((item) => item.id === message.id);
      const messages = exists
        ? currentMessages.map((item) => (item.id === message.id ? message : item))
        : [...currentMessages, message];
      return {
        ...prev,
        detail: {
          ...prev.detail,
          room: {
            ...prev.detail.room,
            lastMessage: message,
            updatedAt: message.createdAt || new Date().toISOString(),
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

