/**
 * 메시지 페이지 관련 유틸리티 함수
 */

import type { ChatRoomSummary } from '@/domain/entities/Chat';

/**
 * 타임스탬프를 상대적 시간 문자열로 포맷팅
 */
export const formatTimestamp = (iso?: string): string => {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) return `${minutes || 1}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * 채팅방에서 상대방 사용자 정보를 가져옴
 */
export const getCounterpart = (room: ChatRoomSummary): { name?: string; nickname?: string; avatarUrl?: string; id: string } | null => {
  const myId = room.me.userId;
  if (room.brandUser && room.brandUser.id !== myId) {
    return room.brandUser;
  }
  if (room.showhostUser && room.showhostUser.id !== myId) {
    return room.showhostUser;
  }
  return room.brandUser ?? room.showhostUser ?? null;
};

