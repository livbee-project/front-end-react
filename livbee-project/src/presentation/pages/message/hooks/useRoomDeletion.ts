import { useState, useCallback, useMemo } from 'react';
import type { ChatRoomSummary } from '@/domain/entities/Chat';
import { chatApiSource } from '@/data/sources/ChatApiSource';
import { useToast } from '@/presentation/contexts/ToastContext';
import { getCounterpart } from '@/presentation/pages/message/utils/messageUtils';

interface UseRoomDeletionOptions {
  rooms: ChatRoomSummary[];
  refresh: () => void;
}

export const useRoomDeletion = ({ rooms, refresh }: UseRoomDeletionOptions) => {
  const { showToast } = useToast();
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const startDelete = useCallback((roomId: string) => {
    setDeletingRoomId(roomId);
    setShowDeleteDialog(true);
  }, []);

  const cancelDelete = useCallback(() => {
    setShowDeleteDialog(false);
    setDeletingRoomId(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deletingRoomId) return;
    setIsProcessing(true);
    try {
      await chatApiSource.deleteRoom(deletingRoomId);
      showToast('채팅방이 삭제되었습니다.');
      refresh();
      cancelDelete();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '채팅방 삭제에 실패했습니다.';
      showToast(errorMessage, undefined, 'error');
      cancelDelete();
    } finally {
      setIsProcessing(false);
    }
  }, [deletingRoomId, refresh, showToast, cancelDelete]);

  const deletingRoomName = useMemo(() => {
    if (!deletingRoomId) {
      return null;
    }
    const targetRoom = rooms.find((room) => room.roomId === deletingRoomId);
    const counterpart = targetRoom ? getCounterpart(targetRoom) : null;
    return counterpart?.name || counterpart?.nickname || '채팅방';
  }, [rooms, deletingRoomId]);

  return {
    deletingRoomId,
    deletingRoomName,
    showDeleteDialog,
    isProcessing,
    startDelete,
    confirmDelete,
    cancelDelete,
  };
};

