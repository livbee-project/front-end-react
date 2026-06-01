import { useCallback, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatRooms } from '@/presentation/hooks/chat/useChatRooms';
import { useRoomDeletion } from '@/presentation/pages/message/hooks/useRoomDeletion';
import { debug } from '@/shared/utils/logger';

export interface MessagesPageController {
  rooms: ReturnType<typeof useChatRooms>['rooms'];
  loading: boolean;
  error: string | null;
  refresh: () => void;

  deletingRoomName: string | null;
  showDeleteDialog: boolean;
  startDelete: (roomId: string) => void;
  confirmDelete: () => Promise<void>;
  cancelDelete: () => void;

  handleMessageClick: (roomId: string, event?: MouseEvent) => void;
  handleDeleteClick: (roomId: string, event: MouseEvent) => void;
}

export const useMessagesPageController = (): MessagesPageController => {
  const navigate = useNavigate();
  const { rooms, loading, error, refresh } = useChatRooms();

  const { deletingRoomName, showDeleteDialog, startDelete, confirmDelete, cancelDelete } = useRoomDeletion({
    rooms,
    refresh,
  });

  useEffect(() => {
    debug('MessagesPage', '상태:', {
      loading,
      error,
      roomsCount: rooms.length,
    });
  }, [loading, error, rooms.length]);

  const handleMessageClick = useCallback(
    (roomId: string, event?: MouseEvent) => {
      // 삭제 버튼 클릭 시에는 네비게이션하지 않음
      if (event && (event.target as HTMLElement).closest('button')) {
        return;
      }
      navigate(`/chat/${roomId}`);
    },
    [navigate]
  );

  const handleDeleteClick = useCallback(
    (roomId: string, event: MouseEvent) => {
      event.stopPropagation();
      startDelete(roomId);
    },
    [startDelete]
  );

  return {
    rooms,
    loading,
    error,
    refresh,
    deletingRoomName,
    showDeleteDialog,
    startDelete,
    confirmDelete,
    cancelDelete,
    handleMessageClick,
    handleDeleteClick,
  };
};

