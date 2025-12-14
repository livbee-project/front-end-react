import { useMemo } from 'react';
import type { ChatMessage, ChatRoomDetail } from '@/domain/entities/Chat';
import type { ApplicationCardData } from '@/shared/utils/chatUtils';
import { debug, warn } from '@/shared/utils/logger';

interface ChatRoomState {
  campaignTitle?: string;
  portfolioTitle?: string;
  message?: string;
  availableDate?: string;
  availableTime?: string;
  roomId?: string;
}

interface UseDisplayedMessagesParams {
  messages: ChatMessage[];
  roomDetail?: ChatRoomDetail | null;
  fallbackState?: ChatRoomState;
  activeRoomId?: string;
  extractApplicationData: (message: ChatMessage) => ApplicationCardData | null;
}

export const useDisplayedMessages = ({
  messages,
  roomDetail,
  fallbackState,
  activeRoomId,
  extractApplicationData,
}: UseDisplayedMessagesParams) => {
  return useMemo(() => {
    const allMessages: ChatMessage[] = [...messages];

    const existingApplicationMessage = allMessages.find(
      (message) => extractApplicationData(message) !== null
    );

    if (roomDetail?.application && !existingApplicationMessage) {
      const app = roomDetail.application;
      const showhostUserId = roomDetail.room.showhostUser?.id;
      if (!showhostUserId) {
        warn('ChatRoomPage', 'showhostUser ID를 찾을 수 없습니다.');
      }
      const tempMessage: ChatMessage = {
        id: `application-${app.applicationId}`,
        roomId: activeRoomId || 'local',
        senderId: showhostUserId || '',
        messageType: 'system',
        content: app.message || '',
        metadata: {
          type: 'application',
          applicationId: app.applicationId,
          campaignTitle: app.campaignTitle,
          portfolioTitle: app.portfolioTitle,
          availableDate: app.availableDate,
          availableTime: app.availableTime,
          message: app.message,
          status: app.status,
        },
        createdAt:
          roomDetail.room.createdAt ??
          app.createdAt ??
          new Date().toISOString(),
      };
      allMessages.push(tempMessage);
    } else if (
      !existingApplicationMessage &&
      fallbackState?.portfolioTitle &&
      fallbackState?.availableDate &&
      fallbackState?.availableTime
    ) {
      const showhostUserId = roomDetail?.room.showhostUser?.id;
      if (!showhostUserId) {
        warn('ChatRoomPage', 'showhostUser ID를 찾을 수 없습니다.');
      }
      const tempMessage: ChatMessage = {
        id: `temp-application-${fallbackState.roomId || 'local'}`,
        roomId: fallbackState.roomId || activeRoomId || 'local',
        senderId: showhostUserId || '',
        messageType: 'system',
        content: fallbackState.message || '',
        metadata: {
          type: 'application',
          campaignTitle: fallbackState.campaignTitle,
          portfolioTitle: fallbackState.portfolioTitle,
          availableDate: fallbackState.availableDate,
          availableTime: fallbackState.availableTime,
          message: fallbackState.message,
        },
        createdAt:
          roomDetail?.room.createdAt ??
          new Date().toISOString(),
      };
      allMessages.push(tempMessage);
    }

    const paymentRequestMessages = allMessages.filter(
      (msg) => msg.metadata?.type === 'payment_request'
    );
    if (paymentRequestMessages.length > 0) {
      debug('ChatRoomPage', 'displayedMessages에 포함된 결제 요청 메시지:', paymentRequestMessages);
    }

    return allMessages.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messages, roomDetail, fallbackState, extractApplicationData, activeRoomId]);
};

