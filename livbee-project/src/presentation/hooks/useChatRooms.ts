import { useCallback, useEffect, useState } from 'react';
import type { ChatRoomSummary } from '@/domain/entities/Chat';
import { ChatRepository } from '@/data/repositories/ChatRepository';
import { useRepository } from '@/presentation/hooks/useRepository';

interface ChatRoomsState {
  rooms: ChatRoomSummary[];
  loading: boolean;
  error: string | null;
}

export const useChatRooms = () => {
  const chatRepository = useRepository(ChatRepository);
  const [state, setState] = useState<ChatRoomsState>({
    rooms: [],
    loading: true,
    error: null,
  });

  const fetchRooms = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const rooms = await chatRepository.getRooms();
      // React는 언마운트된 컴포넌트의 상태 업데이트를 자동으로 무시하므로
      // isMountedRef 체크 없이 바로 상태 업데이트
      setState({ rooms, loading: false, error: null });
    } catch (error) {
      // React는 언마운트된 컴포넌트의 상태 업데이트를 자동으로 무시하므로
      // isMountedRef 체크 없이 바로 상태 업데이트
      setState({
        rooms: [],
        loading: false,
        error: error instanceof Error ? error.message : '메시지 목록을 불러오지 못했습니다.',
      });
    }
  }, [chatRepository]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return {
    rooms: state.rooms,
    loading: state.loading,
    error: state.error,
    refresh: fetchRooms,
  };
};

