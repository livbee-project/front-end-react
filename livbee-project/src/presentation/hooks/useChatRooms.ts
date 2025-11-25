import { useCallback, useEffect, useState } from 'react';
import type { ChatRoomSummary } from '@/domain/entities/Chat';
import { chatApiSource } from '@/data/sources/ChatApiSource';

interface ChatRoomsState {
  rooms: ChatRoomSummary[];
  loading: boolean;
  error: string | null;
}

export const useChatRooms = () => {
  const [state, setState] = useState<ChatRoomsState>({
    rooms: [],
    loading: true,
    error: null,
  });

  const fetchRooms = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const rooms = await chatApiSource.getRooms();
      setState({ rooms, loading: false, error: null });
    } catch (error) {
      setState({
        rooms: [],
        loading: false,
        error: error instanceof Error ? error.message : '메시지 목록을 불러오지 못했습니다.',
      });
    }
  }, []);

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

