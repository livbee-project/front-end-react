import { useMemo } from 'react';
import type { ChatRoomDetail } from '@/domain/entities/Chat';

export const useChatCounterpart = (roomDetail?: ChatRoomDetail) => {
  const counterpart = useMemo(() => {
    if (!roomDetail) return undefined;
    const myId = roomDetail.room.me.userId;
    if (roomDetail.room.brandUser && roomDetail.room.brandUser.id !== myId) {
      return roomDetail.room.brandUser;
    }
    if (roomDetail.room.showhostUser && roomDetail.room.showhostUser.id !== myId) {
      return roomDetail.room.showhostUser;
    }
    return roomDetail.room.brandUser ?? roomDetail.room.showhostUser;
  }, [roomDetail]);

  const displayName = counterpart?.name || counterpart?.nickname || '대화상대';
  const displayRole =
    counterpart?.role === 'brand'
      ? '브랜드'
      : counterpart?.role === 'showhost'
        ? '쇼호스트'
        : '';

  return { counterpart, displayName, displayRole };
};

